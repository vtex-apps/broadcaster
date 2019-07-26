

  
export const toSkuProvider = (id: string) => `SKU-id.${id}`
export const toProductProvider = (id: string) => `Product-id.${id}`
export const toBrandProvider = (id: string) => `Brand-id.${id}`
export const toCategoryProvider = (id: string) => `Category-id.${id}`
export const providerToVbaseFilename = (provider: string) => `${provider}.json`

export interface Storage{
hash: string
}
  