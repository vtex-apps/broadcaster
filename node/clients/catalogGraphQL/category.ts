export const query = `
query GetCategory($id: ID!) {
  category (id: $id) {
    id
    name
    title
    parentCategoryId
    description
    isActive
    globalCategoryId
    score
  }
}
`

export interface Category {
  id: ID
  name: string
  title?: string
  parentCategoryId?: ID
  description?: string
  isActive: boolean
  globalCategoryId: Int
  score?: Int
}
