import { json } from 'co-body'

export async function parseAndValidate (ctx: Context, next: () => Promise<any>) {
    const body =  await json(ctx.req)

    // Temporary if, in the near future broadcaster will only notify us modifications in SKUs or product.
    if (!body.HasStockKeepingUnitModified){
        ctx.status = 204
        return
    }
    
    ctx.state.modifDescription = body
    
    await next()
}