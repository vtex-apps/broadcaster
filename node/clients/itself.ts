import { AppClient, InstanceOptions, IOContext } from '@vtex/api'
import {Settings} from '../directives/settings'

export class Itself extends AppClient {
  constructor(ctx: IOContext, opts?: InstanceOptions) {
    super('vtex.broadcaster-listener', { ...ctx, account: 'storecomponents', workspace: 'araripe2' }, opts)
    // super('vtex.broadcaster-listener', { ...ctx}, opts)
  }

  public getAppSettingsCrossAccount = async (): Promise<any> => {
    console.log('Called client Itself.')
    const appSettings = await this.http.get<any>('/settings')
    // const appSettings = {enabled: true}
    
    return appSettings
  }

  
}
