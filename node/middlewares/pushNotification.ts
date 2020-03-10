import { notification } from './../utils/event'

export async function pushNotification(ctx: Context, next: () => Promise<any>) {
  const { clients: { events } } = ctx

  events.sendEvent('', notification, ctx.state.payload)
  ctx.status = 200

  next()
}