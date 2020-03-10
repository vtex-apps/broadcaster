import { RecorderState, IOClients, EventContext, ServiceContext, ParamsContext } from '@vtex/api'

declare global {
  type Context = ServiceContext<IOClients, State, ParamsContext>
  interface BroadcasterEventContext extends EventContext<IOClients, State> {
    key: string
    sender: string
    body: any
    clients: IOClients
    state: State
  }

  interface State extends RecorderState, BroadcasterEvent {
    alwaysNotify: boolean
    payload: BroadcasterEvent
  }

  interface BroadcasterEvent {
    HasStockKeepingUnitModified: boolean
    IdSku: string
  }

  type ID = string
  type Float = number
  type Int = number
}
