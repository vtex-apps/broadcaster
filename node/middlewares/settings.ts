import { VTEX_APP_ID } from '../constants'

export interface Settings {
  enabled: boolean
}

const DEFAULT_SETTINGS: Settings = {
  enabled: true,
}

const parseSettings = (appSettings: any): Settings => ({
  ...DEFAULT_SETTINGS,
  ...appSettings,
})

export async function settings(ctx: Context, next: () => Promise<any>) {
  const {
    clients: { apps },
  } = ctx

  // This is a feature flag that blocks the further execution
  // of this pipeline. For enabling only 70% of the requests
  // to go forward, you can replace the following line with
  // the following code
  //    const enabledGlobally = Math.random() < 0.7
  const enabledGlobally = Math.random() < 0.01

  const { enabled: enabledInWorkspace } = enabledGlobally 
    ? await apps.getAppSettings(VTEX_APP_ID).then(parseSettings)
    : DEFAULT_SETTINGS

  if (!enabledGlobally || !enabledInWorkspace) {
    ctx.status = 200
    ctx.body =
      'Service not enabled. Please enable this service by setting "enabled" in app settings'
    return
  }

  await next()
}
