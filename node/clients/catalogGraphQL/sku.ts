export const query = `
query GetSKU ($identifier: SKUUniqueIdentifier!) {
  sku (identifier: $identifier) {
    id
    productId
    isActive
    name
    height
    length
    width
    weightKg
    packagedHeight
    packagedWidth
    packagedLength
    packagedWeightKg
    cubicWeight
    isKit
    creationDate
    rewardValue
    manufacturerCode
    commercialConditionId
    measurementUnit
    unitMultiplier
    modalType
    kitItensSellApart
  }
}
`

export interface SKU {
  id: ID
  productId: ID
  isActive: boolean
  name: string
  height?: Float
  length?: Int
  width?: Float
  weightKg?: Float
  packagedHeight?: Float
  packagedWidth?: Float
  packagedLength?: Float
  packagedWeightKg?: Float
  cubicWeight: Float
  isKit: boolean
  creationDate: string
  rewardValue?: Float
  estimatedDateArrival?: string
  manufacturerCode: string
  commercialConditionId: ID
  measurementUnit: string
  unitMultiplier: Int
  modalType?: string
  kitItensSellApart: boolean
}
