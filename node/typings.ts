import { RecorderState, IOClients, ServiceContext, ParamsContext } from '@vtex/api'

declare global {
  type Context = ServiceContext<IOClients, State, ParamsContext>
  
  interface State extends RecorderState, BroadcasterEvent {
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
