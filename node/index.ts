import type { ClientsConfig, ParamsContext } from '@vtex/api'
import { Service, method } from '@vtex/api'

import { Clients } from './clients'
import { parseAndValidate } from './middlewares/parse'
import { throttle } from './middlewares/throttle'
import { pushNotification } from './middlewares/pushNotification'
import { notifyTargetWorkspace } from './middlewares/notifyTargetWorkspace'
import { notifyAllSubaccounts } from './middlewares/notifyAllSubaccounts'

const TREE_SECONDS_MS = 3 * 1000
const CONCURRENCY = 10

const clients: ClientsConfig<Clients> = {
  implementation: Clients,
  options: {
    events: {
      exponentialTimeoutCoefficient: 2,
      exponentialBackoffCoefficient: 2,
      initialBackoffDelay: 50,
      retries: 1,
      timeout: TREE_SECONDS_MS,
      concurrency: CONCURRENCY,
    },
  },
}

export default new Service<Clients, State, ParamsContext>({
  clients,
  routes: {
    // notifications from catalog
    notify: method({
      POST: [
        throttle,
        parseAndValidate,
        pushNotification,
        notifyAllSubaccounts,
        notifyTargetWorkspace,
      ],
    }),
    // notifications from other vtex.broadcaster instances
    notifySelf: method({
      POST: [
        throttle,
        parseAndValidate,
        pushNotification,
        notifyAllSubaccounts,
        notifyTargetWorkspace,
      ],
    }),
  },
})
