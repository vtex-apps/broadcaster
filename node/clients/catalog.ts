import { AppClient, InstanceOptions, IOContext } from '@vtex/api'
import { isArray } from 'util' 

export class Catalog extends AppClient {
  public constructor(ctx: IOContext, opts?: InstanceOptions) {
    super('vtex.catalog-api-proxy', ctx, opts)
   
  }

  public getSku = async (id: string, platform: string): Promise<any> => {
    const isGocommerce = platform === 'gocommerce'
    const path = isGocommerce
      ? `/proxy/catalog/pvt/sku/stockkeepingunitbyid/${id}` 
      : `/proxy/catalog/pvt/sku/stockkeepingunitbyid/${id}`
    const data = await this.http.get<any | [any]>(path, { metric: 'catalog-sales-channel'})
    return isArray(data) ? data[0] : data
  }
  public getProduct = async (id: string, platform: string): Promise<any> => {
    const isGocommerce = platform === 'gocommerce'
    const path = isGocommerce
      ? `/proxy/catalog/pvt/products/ProductGet/${id}` 
      : `/proxy/catalog/pvt/products/ProductGet/${id}`
    const data = await this.http.get<any | [any]>(path, { metric: 'catalog-sales-channel'})
    return isArray(data) ? data[0] : data
  }
  public getCategory = async (id: string, platform: string): Promise<any> => {
    const isGocommerce = platform === 'gocommerce'
    const path = isGocommerce
      ? `/proxy/catalog/pvt/category/${id}` 
      : `/proxy/catalog/pvt/category/${id}`
    const data = await this.http.get<any | [any]>(path, { metric: 'catalog-sales-channel'})
    return isArray(data) ? data[0] : data
  }
  public getBrand = async (id: string, platform: string): Promise<any> => {
    const isGocommerce = platform === 'gocommerce'
    const path = isGocommerce
      ? `/proxy/catalog/pvt/brand/${id}` 
      : `/proxy/catalog/pvt/brand/${id}`
    const data = await this.http.get<any | [any]>(path, { metric: 'catalog-sales-channel'})
    return isArray(data) ? data[0] : data
  }

}