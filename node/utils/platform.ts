import { Functions } from '@gocommerce/utils'

export const getPlatform = (ctx: Context) => 
  Functions.isGoCommerceAcc(ctx) ? 'gocommerce' : 'vtex'