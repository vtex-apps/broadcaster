import { json } from 'co-body'
import { ENABLED_GLOBALLY } from './../constants'

export async function parseAndValidate(ctx: Context, next: () => Promise<any>) {
  if (!ENABLED_GLOBALLY) {
    ctx.body = 'Service not enabled.'
    ctx.status = 200
    return
  }

  const body = (await json(ctx.req)) as BroadcasterEvent

  // Temporary if, in the near future broadcaster will only notify us modifications in SKUs or product.
  if (!body.HasStockKeepingUnitModified) {
    ctx.status = 204
    return
  }

  ctx.state.payload = body

  await next()
}
