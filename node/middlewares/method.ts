
import { Functions } from '@gocommerce/utils'

export const processModification = async (ctx: Context, next:()=> Promise<any>) => {
  console.log('ProcessModification')
  const catalog = ctx.clients.catalog
  const idSKU = ctx.state.modifDescription.IdSku
  const platform = getPlatform(ctx)


  const SKUdata = await catalog.salesChannel(idSKU,platform!)

    ctx.status = 200
  console.log({SKUdata})

  await next()
}




// Put this in state.ts
const getPlatform = (ctx: Context): string => {
  return Functions.isGoCommerceAcc(ctx) ? 'gocommerce' : 'vtex'
}
