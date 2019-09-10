export const query = `
query GetBrand($id: ID!) {
  brand (id: $id) {
    id
    name
    text
    keywords
    siteTitle
    active
    menuHome
    adWordsRemarketingCode
    lomadeeCampaignCode
    score
  }
}
`

export interface Brand {
  id: ID
  name: string
  text?: string
  keywords?: string[]
  siteTitle?: string
  active: boolean
  menuHome: boolean
  adWordsRemarketingCode?: string
  lomadeeCampaignCode?: string
  score?: Int
}
