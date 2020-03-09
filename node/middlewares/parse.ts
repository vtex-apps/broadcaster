
export async function parseAndValidate(ctx: Context, next: () => Promise<any>) {

  ctx.state = {
    ...ctx.state,
    ...ctx.body
  }

  await next()
}
