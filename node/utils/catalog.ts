import * as crypto from 'crypto'

export interface Storage {
  hash: string
}

export const toSkuProvider = (id: string) => `SKU-id.${id}`
export const toProductProvider = (id: string) => `Product-id.${id}`
export const toBrandProvider = (id: string) => `Brand-id.${id}`
export const toCategoryProvider = (id: string) => `Category-id.${id}`

export const providerToVbaseFilename = (provider: string) => `${provider}.json`

export const objToHash = <T>(obj: T) =>
  crypto
    .createHash('md5')
    .update(JSON.stringify(obj))
    .digest('hex')
