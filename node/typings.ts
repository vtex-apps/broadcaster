import { RecorderState, IOClients, EventContext } from '@vtex/api'

declare global {
  interface Context extends EventContext<IOClients, State> {
    key: string
    sender: string
    body: any
    clients: IOClients
    state: State
  }

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
