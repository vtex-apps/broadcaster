

export interface Settings {
    enabled: boolean
}

export const DEFAULT_SETTINGS: Settings = {
    enabled: true,
}

export const settings = async (appSettings: any): Promise<Settings> => {
    const {
      enabled,
    }: {
      enabled: boolean
    } = {
      ...DEFAULT_SETTINGS,
      ...appSettings,
    }

    return {
      enabled,
    }
  }