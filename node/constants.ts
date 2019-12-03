import { appIdToAppAtMajor } from "@vtex/api"

export const USER_BUCKET = 'listener'

export const VTEX_APP_ID = process.env.VTEX_APP_ID!

export const VTEX_APP_AT_MAJOR = appIdToAppAtMajor(VTEX_APP_ID)

export const MAX_CONCURRENCY = 10
