import { ClientsConfig, LRUCache, method, Service } from '@vtex/api'

import { Clients } from './clients'
import { notify } from './middlewares/notify'
import { parseAndValidate } from './middlewares/parse'
import { settings } from './middlewares/settings'

const ONE_SECOND_MS = 1000

const vbaseCacheStorage = new LRUCache<string, any>({
  max: 5000,
})

metrics.trackCache('vbase', vbaseCacheStorage)

const clients: ClientsConfig<Clients> = {
  implementation: Clients,
  options: {
    default: {
      retries: 2,
      timeout: ONE_SECOND_MS,
    },
    vbase: {
      memoryCache: vbaseCacheStorage,
    },
  },
}

export default new Service<Clients, State>({
  clients,
  routes: {
    notify: method({
      POST: [
        settings,
        parseAndValidate,
        notify,
      ],
    }),
  },
})
