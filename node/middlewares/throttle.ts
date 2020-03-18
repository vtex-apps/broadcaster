import { TooManyRequestsError } from '@vtex/api'

const MAX_REQUEST = 50
let COUNTER = 0

export async function throttle(
  _: Context,
  next: () => Promise<void>
) {
  COUNTER++
  try {
    if (COUNTER > MAX_REQUEST) {
      throw new TooManyRequestsError()
    }
    await next()
  } finally {
    COUNTER--
  }
}