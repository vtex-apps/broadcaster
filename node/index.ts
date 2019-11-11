import { LRUCache, method, Service, Cached } from '@vtex/api'

import { Clients } from './clients'
import { locale } from './middlewares/locale'
import { notify } from './middlewares/notify'
import { parseAndValidate } from './middlewares/parse'
import { settings } from './middlewares/settings'

const ONE_SECOND_MS = 1000
const TREE_SECONDS_MS = 3 * 1000

const vbaseCacheStorage = new LRUCache<string, Cached>({
  max: 5000,
})

const appsCacheStorage = new LRUCache<string, Cached>({
  max: 2500,
})

const catalogCacheStorage = new LRUCache<string, Cached>({
  max: 5000,
})

const tenantCacheStorage = new LRUCache<string, Cached>({
  max: 3000
})

const segmentCacheStorage = new LRUCache<string, Cached>({
  max: 3000
})

metrics.trackCache('vbase', vbaseCacheStorage)
metrics.trackCache('apps', appsCacheStorage)
metrics.trackCache('catalog', catalogCacheStorage)
metrics.trackCache('tenant', tenantCacheStorage)
metrics.trackCache('segment', segmentCacheStorage)

export default new Service<Clients, State>({
  clients: {
    implementation: Clients,
    options: {
      default: {
        retries: 2,
        timeout: ONE_SECOND_MS,
      },
      vbase: {
        memoryCache: vbaseCacheStorage,
      },
      apps: {
        memoryCache: appsCacheStorage,
      },
      catalogGraphQL: {
        memoryCache: catalogCacheStorage,
      },
      tenant: {
        memoryCache: tenantCacheStorage,
        timeout: TREE_SECONDS_MS
      },
      segment: {
        memoryCache: segmentCacheStorage,
        timeout: TREE_SECONDS_MS
      }
    },
  },
  routes: {
    notify: method({
      POST: [locale, settings, parseAndValidate, notify],
    }),
  },
})
