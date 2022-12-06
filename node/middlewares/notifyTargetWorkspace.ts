import { BroadcasterClient } from '../clients/broadcaster'

const TIMEOUT_MS = 3000
const RETRIES = 2

export async function notifyTargetWorkspace(
  ctx: Context,
  next: () => Promise<any>
) {
  const {
    clients: { apps },
    state: { payload },
    vtex: { workspace },
  } = ctx

  if (workspace !== 'master') {
    return next()
  }

  const { targetWorkspace } = await apps.getAppSettings(
    `${process.env.VTEX_APP_ID}`
  )

  if (!targetWorkspace || targetWorkspace === workspace) {
    return next()
  }

  // instance new client for target workspace
  const broadcasterClient = new BroadcasterClient(
    {
      ...ctx.vtex,
      workspace: targetWorkspace,
    },
    {
      retries: RETRIES,
      timeout: TIMEOUT_MS,
    }
  )

  broadcasterClient.notify(payload).catch((error) => {
    if (error?.response?.status === 404) {
      ctx.vtex.logger.warn("Target workspace not set or doesn't exist")
    }
  })
  next()
}
