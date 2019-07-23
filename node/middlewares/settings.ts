
// import inflight from 'promise-inflight'

import {json} from 'co-body'
import {settings} from '../directives/settings'


export const injectAndCheckAppSettings = async (ctx: Context, next: () => Promise<any>) => {

    // Temporary, call route to master to read ON/OFF status from Vbase
    const appSettings = await ctx.clients.itself.getAppSettingsCrossAccount()
    const enabled = appSettings.enabled    



    if (!enabled){
        ctx.status = 401
        ctx.body = 'Service not enabled.'
        return 
    }

    const body =  await json(ctx.req)

    // Temporary if, in the near future broadcaster will only notify us modifications in SKUs or product.
    if (!body.HasStockKeepingUnitModified){
        ctx.status = 204
        return
    }
    ctx.state.modifDescription = body
    await next()
}

export const injectAppSettingsCrossAccount = async (ctx: Context, next: () => Promise<any>)=>{
    const appSettings = await ctx.clients.apps.getAppSettings(''+process.env.VTEX_APP_ID)
    const appSettingsResolved = await settings(appSettings)
    ctx.body = appSettingsResolved
    await next()
}





