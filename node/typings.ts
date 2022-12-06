import type { RecorderState, ServiceContext } from '@vtex/api'

import { Clients } from './clients'

declare global {
  type Context = ServiceContext<Clients, State>

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
