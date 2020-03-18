import { BROADCASTER_NOTIFICATION } from './../constants'

export async function pushNotification(ctx: Context, next: () => Promise<any>) {
  const { clients: { events } } = ctx

  await events.sendEvent('', BROADCASTER_NOTIFICATION, ctx.state.payload)
  ctx.status = 200

  next()
}