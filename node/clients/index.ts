import { IOClients } from '@vtex/api'

import { CatalogGraphQL } from './catalogGraphQL'

// Extend the default IOClients implementation with our own custom clients.
export class Clients extends IOClients {
  public get catalogGraphQL() {
    return this.getOrSet('catalogGraphQL', CatalogGraphQL)
  }
}
