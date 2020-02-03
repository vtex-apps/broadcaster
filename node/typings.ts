import { ServiceContext, RecorderState, ParamsContext } from '@vtex/api'

import { Clients } from './clients'

declare global {
  type Context = ServiceContext<Clients, State, Custom>

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
