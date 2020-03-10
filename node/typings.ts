import { RecorderState, IOClients, EventContext, ServiceContext, ParamsContext } from '@vtex/api'

declare global {
  type Context = ServiceContext<IOClients, State, ParamsContext>
  
  type BroadcasterEventContext = EventContext<IOClients, State>

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
