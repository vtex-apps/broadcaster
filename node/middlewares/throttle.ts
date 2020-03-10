import { TooManyRequestsError } from '@vtex/api'

const SC_MAX_REQUEST = 50
const IO_MAX_REQUEST = 200
let SC_COUNTER = 0
let IO_COUNTER = 0

export async function SCBroadcasterThrottle(
  _: Context,
  next: () => Promise<void>
) {
  SC_COUNTER++
  try {
    if (SC_COUNTER > SC_MAX_REQUEST) {
      throw new TooManyRequestsError()
    }
    await next()
  } finally {
    SC_COUNTER--
  }
}

export async function IOBroadcasterThrottle(
  _: BroadcasterEventContext,
  next: () => Promise<void>
) {
  IO_COUNTER++
  try {
    if (IO_COUNTER > IO_MAX_REQUEST) {
      throw new TooManyRequestsError()
    }
    await next()
  } finally {
    IO_COUNTER--
  }
}
