import { ServiceContext, RecorderState, ParamsContext, IOClients } from '@vtex/api'

declare global {
  type Context = ServiceContext<IOClients, State, Custom>

  interface State extends RecorderState, BroadcasterEvent {
    alwaysNotify: boolean
  }

  interface BroadcasterEvent {
    HasStockKeepingUnitModified: boolean
    IdSku: string
  }
  interface Custom extends ParamsContext {
  }

  type ID = string
  type Float = number
  type Int = number
}
