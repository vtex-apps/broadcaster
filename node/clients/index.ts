import { IOClients } from '@vtex/api'

import { BroadcasterClient } from './broadcaster'

export class Clients extends IOClients {
  public get broadcaster() {
    return this.getOrSet('broadcaster', BroadcasterClient)
  }
}
