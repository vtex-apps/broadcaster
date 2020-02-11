import { LRUCache, method, Service, Cached, IOClients, ParamsContext } from '@vtex/api'

import { locale } from './middlewares/locale'
import { notify } from './middlewares/notify'
import { parseAndValidate } from './middlewares/parse'
import { settings } from './middlewares/settings'
import { throttle } from './middlewares/throttle'

const ONE_SECOND_MS = 1000
const TREE_SECONDS_MS = 3 * 1000
const CONCURRENCY = 10

const tenantCacheStorage = new LRUCache<string, Cached>({
  max: 3000
})

const segmentCacheStorage = new LRUCache<string, Cached>({
  max: 3000
})

metrics.trackCache('tenant', tenantCacheStorage)
metrics.trackCache('segment', segmentCacheStorage)

export default new Service<IOClients, State, ParamsContext>({
  clients: {
    options: {
      default: {
        retries: 2,
        timeout: ONE_SECOND_MS,
        concurrency: CONCURRENCY,
      },
      tenant: {
        memoryCache: tenantCacheStorage,
        timeout: TREE_SECONDS_MS
      },
      segment: {
        memoryCache: segmentCacheStorage,
        timeout: TREE_SECONDS_MS
      },
    },
  },
  routes: {
    notify: method({
      POST: [throttle, settings, locale, parseAndValidate, notify],
    }),
  },
})
