import { ClientsConfig, LRUCache, Service, ServiceContext } from '@vtex/api'
import { Clients } from './clients'
import { Settings } from './directives/settings'
import { processModification } from './middlewares/methods'
import { injectAndCheckAppSettings } from './middlewares/settings'
import { injectAppSettingsCrossAccount } from './middlewares/settings'


const TIMEOUT_MS = 800

const memoryCache = new LRUCache<string, any>({max: 5000})
metrics.trackCache('status', memoryCache)

const clients: ClientsConfig<Clients> = {
  implementation: Clients,
  options: {
    default: {
      retries: 2,
      timeout: TIMEOUT_MS,
    },
    status: {
      memoryCache,
    },
    vbase: {
      memoryCache,
    },
  },
}

declare global {
  type Context = ServiceContext<Clients, State>
  interface State {
    code: number,
    modifDescription: any,
    settings: Settings,
  }

}

export default new Service<Clients, State>({
  clients,
  routes: {
    settings:[
      injectAppSettingsCrossAccount,
    ],
    status: [
      injectAndCheckAppSettings,
      processModification, 
    ],
  },
})
