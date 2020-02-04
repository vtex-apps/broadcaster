export const query = `
query GetProduct ($identifier: ProductUniqueIdentifier!) {
  product (identifier: $identifier) {
    id
    brandId
    categoryId
    departmentId
    name
    linkId
    refId
    isVisible
    description
    shortDescription
    releaseDate
    keywords
    title
    isActive
    taxCode
    metaTagDescription
    supplierId
    showWithoutStock
    score
    salesChannel {
      id
    }
  }
}
`

export interface Product {
  id: ID
  brandId: ID
  categoryId: ID
  departmentId: ID
  name: string
  linkId: string
  refId?: string
  isVisible: boolean
  description?: string
  shortDescription?: string
  releaseDate?: string
  keywords: string[]
  title?: string
  isActive: boolean
  taxCode?: string
  metaTagDescription?: string
  supplierId?: ID
  showWithoutStock: boolean
  score?: Int
}
