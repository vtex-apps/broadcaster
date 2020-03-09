import { VTEX_APP_AT_MAJOR } from '../constants'

export interface Settings {
  enabled: boolean
  alwaysNotify: boolean
}

const DEFAULT_SETTINGS: Settings = {
  alwaysNotify: false,
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
  // of this pipeline. For enabling only 50% of the requests
  // to go forward, you can replace the following line with
  // the code: `const enabledGlobally = Math.random() < 0.5`
  const enabledGlobally = true

  const { enabled: enabledInWorkspace, alwaysNotify } = enabledGlobally 
    ? await apps.getAppSettings(VTEX_APP_AT_MAJOR).then(parseSettings)
    : DEFAULT_SETTINGS

  ctx.state.alwaysNotify = true //alwaysNotify
  
  if (!enabledGlobally || !enabledInWorkspace) {
    ctx.body =
      'Service not enabled. Please enable this service by setting "enabled" in app settings'
    return
  }

  await next()
}
