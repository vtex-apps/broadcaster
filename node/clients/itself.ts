import { AppClient, InstanceOptions, IOContext } from '@vtex/api'
import {Settings} from '../directives/settings'

export class Itself extends AppClient {
  constructor(ctx: IOContext, opts?: InstanceOptions) {
    super('vtex.broadcaster-listener', { ...ctx, account: 'vtex', workspace: 'master' }, opts)
  }

  public getAppSettingsCrossAccount = async (): Promise<Settings> => {

    const appSettings = await this.http.get<Settings>('/_v/settings')
    
    return appSettings
  }

  
}
