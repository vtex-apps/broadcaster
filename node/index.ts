import { LRUCache, Service, Cached, IOClients, ParamsContext, method } from '@vtex/api'

import { locale } from './middlewares/locale'
import { notify } from './middlewares/notify'
import { parseAndValidate } from './middlewares/parse'
import { settings } from './middlewares/settings'
import { SCBroadcasterThrottle, IOBroadcasterThrottle } from './middlewares/throttle'
import { pushNotification } from './middlewares/pushNotification'

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
      events: {
        timeout: TREE_SECONDS_MS
      }
    },
  },
  routes: {
    notify: method({
      POST: [SCBroadcasterThrottle, settings, parseAndValidate, pushNotification],
    }),
  },
  events: {
    broadcasterNotification: [
      IOBroadcasterThrottle, settings, locale, notify,
    ],
  }
})
