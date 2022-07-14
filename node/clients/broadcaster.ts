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

  public notify(payload: BroadcasterEvent): Promise<any> {
    return this.http.post(`/_v/self/notify`, payload, {
      headers: {
        ...this.options?.headers,
      },
    })
  }
}
