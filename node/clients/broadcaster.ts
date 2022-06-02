import { AppClient, InstanceOptions, IOContext } from '@vtex/api'

export class BroadcasterClient extends AppClient {
  constructor(ioContext: IOContext, options?: InstanceOptions) {
    super('vtex.broadcaster@0.x', ioContext, {
      ...options,
      headers: {
        VtexIdclientAutCookie: ioContext.authToken,
        ...options?.headers,
      },
    })
  }

  public notifyWorkspace(payload: BroadcasterEvent): Promise<any> {
    return this.http.post(`/notify`, payload, {
      headers: {
        ...this.options?.headers,
      },
    })
  }
}
