import { json } from 'co-body'

import { ENABLED_GLOBALLY } from '../constants'

export async function parseAndValidate(ctx: Context, next: () => Promise<any>) {  
  if (!ENABLED_GLOBALLY) {
    ctx.body = 'Service not enabled.'
    ctx.status = 200
    return
  }

  const body = (await json(ctx.req)) as BroadcasterEvent

  ctx.state.payload = body

  await next()
}
