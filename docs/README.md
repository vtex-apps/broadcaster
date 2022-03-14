# Broadcaster Adapter

The Broadcaster adapter is designed to adapt broadcaster catalog changes to an event in IO's Events system. 

With the catalog changes being broadcasted to IO, you can have apps that listen to the catalog changes and do tasks according to the changes. For example, the [Availability Notify](https://developers.vtex.com/vtex-developer-docs/docs/vtex-availability-notify) app uses the Broadcaster Adapter to monitor inventory updates. Once the requested SKU gets back in stock, the app will email shoppers who asked to be notified.

![broadcaster-architecture](https://user-images.githubusercontent.com/67270558/158252905-3480125a-fabe-4db3-bb4d-7c7dea74f8ef.png)

The broadcaster adapter receives a POST request with the data of the SKU that changed, and then it will push an event to the Event system to broadcast to apps that want to listen to these changes.

## SKU Data
When the Broadcaster Adapter app sends an event, it contains a payload with the following fields.

| Field Name | Description | Type |
| -------- | -------- | -------- |
| `IdSku`| SKU ID in VTEX    | string|
| `ProductId`| Product ID in VTEX  | long|
| `An` | Account Name in VTEX, shown in the store’s VTEX Admin url.   | string|
| `IdAffiliate`    | Affiliate ID generated automatically in the configuration. | string|
| `DateModified`     | Date when the item was updated. | string| 
| `IsActive`     | Identifies whether the product is active or not. If `true` the product/SKU is active  | boolean |
| `StockModified` | Identifies that the inventory level has been altered. If `false`, the inventory level has not been changed.| boolean |
| `PriceModified` | Identifies that the price has been altered. If `false`, the product/SKU price has not been changed.| boolean | 
| `HasStockKeepingUnitModified` | Identifies that the product/SKU registration data has changed, such as name, description, weight, etc. If `true`, the product/SKU registration data changed. | boolean | 
| `HasStockKeepingUnitRemovedFromAffiliate` | Identifies that the product is no longer associated with the trade policy. If `true`, the trade policy has changed. | boolean | 



## Testing the app

Make a `POST` request to
`app.io.vtex.com/vtex.broadcaster/v0/{{account}}/{{workspace}}/notify`
with the body:

```
{
	"HasStockKeepingUnitModified": true,
	"IdSku": {{SKU id}}
}
```
