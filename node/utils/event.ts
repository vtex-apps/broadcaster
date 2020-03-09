export const eventName = (route: string) => `broadcaster.${route}`

export const skuChanged = eventName('sku')
export const productChanged = eventName('product')
export const brandChanged = eventName('brand')
export const categoryChanged = eventName('category')
export const notification = eventName('notification')
