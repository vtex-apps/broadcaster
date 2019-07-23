import { AppClient, InstanceOptions, IOContext } from '@vtex/api'
import { isArray } from 'util' 

export class Catalog extends AppClient {
  public constructor(ctx: IOContext, opts?: InstanceOptions) {
    super('vtex.catalog-api-proxy', ctx, opts)
   
  }

  public salesChannel = async (id: string, platform: string): Promise<any> => {
    const isGocommerce = platform === 'gocommerce'
    const path = isGocommerce
      ? `/proxy/catalog/pvt/sku/stockkeepingunitbyid/${id}` 
      : `/proxy/catalog/pvt/sku/stockkeepingunitbyid/${id}`
    const data = await this.http.get<any | [any]>(path, { metric: 'catalog-sales-channel'})
    return isArray(data) ? data[0] : data
  }
}