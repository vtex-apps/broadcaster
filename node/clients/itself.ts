import { AppClient, InstanceOptions, IOContext } from '@vtex/api'

export class Itself extends AppClient {
  constructor(ctx: IOContext, opts?: InstanceOptions) {
    super('vtex.broadcaster-listener', { ...ctx, account: 'storecomponents', workspace: 'araripe2' }, opts)
  }

  public getAppSettingsCrossAccount = async (): Promise<any> => {
    console.log('Called client Itself.')
    const appSettings = await this.http.get<any>('/settings')
    
    return appSettings
  }

  
}
