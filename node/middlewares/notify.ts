import { map } from 'bluebird'
import { omit } from 'ramda'

import { MAX_CONCURRENCY, USER_BUCKET } from '../constants'
import {
  objToHash,
  providerToVbaseFilename,
  Storage,
  toBrandProvider,
  toCategoryProvider,
  toProductProvider,
  toSkuProvider,
} from '../utils/catalog'
import { getPlatform } from '../utils/platform'

const propertiesNotProductInProduct = ['DepartmentId','CategoryId','BrandId']
const propertiesProductInSku =  ['ProductName','ProductDescription','ProductRefId'] // For now, ProductSpecifications is a SKU property, it will soon be a Specification prop.
const propertiesBrandInSku = ['BrandName']
const propertiesCategoryInSku = ['ProductCategories']
const propertiesIdInSku = ['ProductId','ProductRefId','BrandId','ProductCategoryIds','ProductClustersIds']
const propertiesNotSkuInSku = [
  ...propertiesProductInSku,
  ...propertiesBrandInSku,
  ...propertiesCategoryInSku,
  ...propertiesIdInSku,
]

const categoriesFromProductCategoryIds = (productCategoryIds: string) => {
  const idsNoFirstCharacter = productCategoryIds.substring(1, productCategoryIds.length - 1) 
  return idsNoFirstCharacter.split('/')
}

const evalModification = async (excludedProps: string[] | null, route: string, rawData: any, fileName: string, ctx: Context) => {
  const { clients: { vbase, events } } = ctx
  const data = excludedProps ? omit(excludedProps, rawData) : rawData
  const hash = objToHash(data)
  
  const maybeOldHashContainer = await vbase.getJSON<Storage | null>(USER_BUCKET, fileName, true)

  if (maybeOldHashContainer && maybeOldHashContainer.hash !== hash) {
    await vbase.saveJSON<Storage>(USER_BUCKET, fileName, { hash })

    const eventName = `broadcaster.${route}`
    await events.sendEvent('', eventName, data)

    return true
  }

  return false
}

export async function notify (ctx: Context, next: () => Promise<any>) {
  const { clients: { catalog }, state: { modifDescription : { idSku } } } = ctx
  const platform = getPlatform(ctx)

  const dataSku = await catalog.getSku(idSku, platform)

  // Modification in SKU
  const filenameSku = providerToVbaseFilename(toSkuProvider(idSku))
  await evalModification(propertiesNotSkuInSku, 'sku', dataSku, filenameSku, ctx)
  
  // Modification in Product
  const productId = dataSku.ProductId
  const filenameProduct = providerToVbaseFilename(toProductProvider(productId))
  const dataProduct = await catalog.getProduct(productId, platform)
  await evalModification(propertiesNotProductInProduct, 'product', dataProduct, filenameProduct, ctx)

  // Modification in Brand
  const brandId = dataSku.BrandId
  const filenameBrand = providerToVbaseFilename(toBrandProvider(brandId))
  const dataBrand = await catalog.getBrand(brandId,platform)
  await evalModification(null, 'brand', dataBrand, filenameBrand, ctx)

  // Modification in Category
  const productCategoryIds = dataSku.ProductCategoryIds
  const categoryIds = categoriesFromProductCategoryIds(productCategoryIds)
  await map(
    categoryIds,
    async (id) => {
      const filenameCategory = providerToVbaseFilename(toCategoryProvider(id))
      const dataCategory = await catalog.getCategory(id, platform)
      await evalModification(null, 'category', dataCategory, filenameCategory, ctx)
    },
    {
      concurrency: MAX_CONCURRENCY,
    }
  )
  
  ctx.status = 200
  await next()
}
