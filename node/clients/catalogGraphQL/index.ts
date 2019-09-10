import { AppGraphQLClient, InstanceOptions, IOContext } from '@vtex/api'
import { prop } from 'ramda'

import { Brand, query as getBrand } from './brand'
import { Category, query as getCategory } from './category'
import { Product, query as getProduct } from './product'
import { query as getSKU, SKU } from './sku'

export class CatalogGraphQL extends AppGraphQLClient {
  public constructor(ctx: IOContext, opts?: InstanceOptions) {
    super('vtex.catalog-graphql', ctx, {
      ...opts, 
      headers: {
        ...opts && opts.headers,
        cookie: `VtexIdclientAutCookie=${ctx.authToken}`
      }})
  }

  public sku = (id: string) => {
    const variables = {
      identifier: {
        field: 'id',
        value: id,
      },
    }
    return this.graphql
      .query<{sku: SKU}, typeof variables>({
        inflight: true,
        query: getSKU,
        variables,
      })
      .then(prop('data'))
  }

  public product = (id: string) => {
    const variables = {
      identifier: {
        field: 'id',
        value: id,
      },
    }
    return this.graphql
      .query<{product: Product}, typeof variables>({
        inflight: true,
        query: getProduct,
        variables,
      })
      .then(prop('data'))
  }

  public category = (id: string) =>
    this.graphql
      .query<{category: Category}, { id: ID }>({
        inflight: true,
        query: getCategory,
        variables: { id },
      })
      .then(prop('data'))

  public brand = (id: string) =>
    this.graphql
      .query<{brand: Brand}, { id: ID }>({
        inflight: true,
        query: getBrand,
        variables: { id },
      })
      .then(prop('data'))
}
