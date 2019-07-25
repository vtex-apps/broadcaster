

import { Functions } from '@gocommerce/utils'
import * as crypto from 'crypto'
import { pick, compose, reduce, filter, keys} from 'ramda'
import { USER_BUCKET } from '../constants'

/* 
  Separate Product and Sku properties. Motives: if a product changes, we are notified for every single Sku.
  Obs.: if ProductId changes, sku is modified;
        If BrandId changes, product is modified;
        If category ID changes, product is modified. 
  However, those do not affect translatable properties, for sure.
 */

const propertiesNotProductInProduct = new Set(['DepartmentId','CategoryId','BrandId'])
const propertiesProductInSku =  new Set(['ProductName','ProductDescription','ProductRefId']) // For now, ProductSpecifications is a SKU property, it will soon be a Specification prop.
const propertiesBrandInSku = new Set(['BrandName'])
const propertiesCategoryInSku = new Set(['ProductCategories'])
const propertiesIdInSku = new Set(['ProductId','ProductRefId','BrandId','ProductCategoryIds','ProductClustersIds'])
const propertiesNotSkuInSku = new Set([
  ...propertiesProductInSku,
  ...propertiesBrandInSku,
  ...propertiesCategoryInSku,
  ...propertiesIdInSku,
])

export const processModification = async (ctx: Context, next:()=> Promise<any>) => {

  console.log('ProcessModification')
  const catalog = ctx.clients.catalog
  const idSku = ctx.state.modifDescription.IdSku
  const platform = getPlatform(ctx)

  const dataSku = await catalog.getSku(idSku,platform)
  console.log({dataSku})


  // Modification in SKU
  const filenameSku = providerToVbaseFilename(toSkuProvider(idSku))
  await evalModification(propertiesNotSkuInSku,'sku',dataSku, filenameSku, ctx)
  

  // Modification in Product
  const idProduct = dataSku.ProductId
  const filenameProduct = providerToVbaseFilename(toProductProvider(idProduct))
  const dataProduct = await ctx.clients.catalog.getProduct(idProduct,platform)
  await evalModification(propertiesNotProductInProduct,'product',dataProduct, filenameProduct, ctx)

  // Modification in Brand
  const idBrand = dataSku.BrandId
  const filenameBrand = providerToVbaseFilename(toBrandProvider(idBrand))
  const dataBrand = ctx.clients.catalog.getBrand(idBrand,platform)
  await evalModification(null,'brand',dataBrand, filenameBrand, ctx)

  // Modification in Category
  const idsCategoryStr = dataSku.ProductCategoryIds
  const idsCategory = idsCategoryStr.substring(1,idsCategoryStr.length - 1).split('/')
  let filenameCategory
  let dataCategory
  for (const id of idsCategory){
    filenameCategory = providerToVbaseFilename(toCategoryProvider(id))
    dataCategory = await ctx.clients.catalog.getCategory(id,platform)
    await evalModification(null,'category',dataCategory, filenameCategory, ctx)
  }
 
  
  

  ctx.status = 200
  await next()
}

const evalModification = async (excludedProps:Set<string>|null,route:string, data:any, fileName: string, ctx: Context)=>{
  console.log(`Data in ${route}`,{data})
  let dataObjInObj = null
  if (excludedProps !== null){
    const propertiesObjInObj = filter(
      (key) => 
        !excludedProps.has(key),
      keys(data)
    )
    dataObjInObj = pick(propertiesObjInObj, data)
  }

  const hashNew = crypto.createHash('md5').update(JSON.stringify( dataObjInObj || data,null,2)).digest('hex')
  const jsonNew:Storage = {hash:hashNew}
  const jsonOld = await ctx.clients.vbase.getJSON<Storage | null>(USER_BUCKET,fileName,true)
  console.log('Old json:',JSON.stringify(jsonOld,null,2))  

  if ((jsonOld === null) || (hashNew !== jsonOld.hash)){
    console.log('Json modified. New json:',JSON.stringify(jsonNew.hash,null,2))
    ctx.clients.vbase.saveJSON(USER_BUCKET, fileName,jsonNew)
    await ctx.clients.events.sendEvent(process.env.VTEX_APP_ID!,`listener.${route}`,data)
    return true
  }
  return false
}


const getPlatform = (ctx: Context) => {
  return Functions.isGoCommerceAcc(ctx) ? 'gocommerce' : 'vtex'
}

const toSkuProvider = (id: string) => `Product-id.${id}`
const toProductProvider = (id: string) => `SKU-id.${id}`
const toBrandProvider = (id: string) => `Brand-id.${id}`
const toCategoryProvider = (id: string) => `Category-id.${id}`
const providerToVbaseFilename = (provider: string) => `${provider}.json`

interface Storage{
  hash: string
}

