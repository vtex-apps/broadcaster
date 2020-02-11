import { ServiceContext, RecorderState, IOClients, ParamsContext } from '@vtex/api'

declare global {
  type Context = ServiceContext<IOClients, State, ParamsContext>

  interface State extends RecorderState, BroadcasterEvent {
    alwaysNotify: boolean
  }

  interface BroadcasterEvent {
    HasStockKeepingUnitModified: boolean
    IdSku: string
  }

  type ID = string
  type Float = number
  type Int = number
}
