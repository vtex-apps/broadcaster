# Broadcaster-listener

App in VTEXIO designed to listen to broadcaster catalog changes 
and to notify other apps that want to know the changes.

### How it works?

The broadcaster listener receives the `id` of the SKU that has been indexed.
It then gets all SKU data and checks if there was any change, it does that by hashing
the catalog response and comparing it to the one saved in VBase, if the SKU has changed
it pushes and event to Colossus with the SKU data.

It does the same thing for the SKU's product, brand and categories data.

### Settings

| Name         || Description                                                                                                 | Type    | Default value |
|--------------|-|-------------------------------------------------------------------------------------------------------------|---------|---------------|
| enabled      || Enables listening to the Broadcaster events related to modifications of SKU and/or products in the catalog. | boolean | true          |
| alwaysNotify || Disables filter that allows notification only when the data has changed.                                    | boolean | false         |

### Testing

You can do a `POST` request to
`app.io.vtex.com/vtex.broadcaster/v0/{{account}}/{{workspace}}/notify`
with the body:
```
{
	"HasStockKeepingUnitModified": "true",
	"IdSku": {{SKU id}}
}
```
