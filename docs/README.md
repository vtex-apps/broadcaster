# Broadcaster Adapter

App in VTEX IO designed to adapat broadcaster catalog changes to an event in IO's Events system.

### How it works?

The broadcaster adapter will recieve a POST request with the data of the SKU that changed and then it will push an event to the Event system to broadcast to apps that want to listen to this changes.

### Testing

You can do a `POST` request to
`app.io.vtex.com/vtex.broadcaster-adapter/v0/{{account}}/{{workspace}}/notify`
with the body:
```
{
	"HasStockKeepingUnitModified": "true",
	"IdSku": {{SKU id}}
}
```
