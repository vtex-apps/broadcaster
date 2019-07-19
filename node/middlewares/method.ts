export const method = async (ctx: Context, next: () => Promise<any>) => {
  // if (ctx.method.toUpperCase() !== 'GET') {
  //   ctx.status = 405
  //   return
  // }
  ctx.set('cache-control','no-cache, no-store')
  ctx.body = 'hello'
  const returnedValue = await ctx.clients.vbase.getJSON('araripe','file.json', true)
  console.log({returnedValue})

  await next()
}
