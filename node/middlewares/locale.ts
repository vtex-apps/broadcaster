const TEN_MINUTES_S = 10 * 60

const getTenant = async (clients: Context['clients']) => {
  const { segment, tenant } = clients
  const [ segmentData, tenantInfo ] = await Promise.all([
    segment.getSegmentByToken(null),
    tenant.info({
      forceMaxAge: TEN_MINUTES_S,
      nullIfNotFound: true,
    }).catch(_ => null),
  ])
  const cultureFromTenant = tenantInfo && tenantInfo.defaultLocale
  const cultureFromDefaultSegment = segmentData!.cultureInfo

  return {
    locale: cultureFromTenant || cultureFromDefaultSegment,
  }
}

export async function locale(ctx: Context, next: () => Promise<any>) {

  /** 
   * Insert tenant and locale values into the context so we call
   * all other services with the correct headers
  */
  if (!ctx.vtex.tenant || !ctx.vtex.locale) {
    const tenantInfo = await getTenant(ctx.clients) 
    
    ctx.vtex.tenant = tenantInfo
    ctx.vtex.locale = tenantInfo.locale
  }
  
  await next()
}
