import { BroadcasterClient } from '../clients/broadcaster'

const TIMEOUT_MS = 3000
const RETRIES = 2

export async function notifyAllSubaccounts(
  ctx: Context,
  next: () => Promise<any>
) {
  const {
    clients: { apps, licenseManager },
    state: { payload },
    vtex: { account, authToken, logger, workspace },
  } = ctx

  if (workspace !== 'master') {
    return next()
  }

  const { notifySubaccounts = false } = await apps.getAppSettings(
    `${process.env.VTEX_APP_ID}`
  )

  if (!notifySubaccounts) {
    return next()
  }

  const { accountName, sites = [] } = await licenseManager
    .getAccountData(authToken)
    .catch((error) => {
      logger.error({
        message: 'getAccountData-error',
        error,
      })
      return {}
    })

  // if accountName doesn't match the current account, then the app is running in a subaccount
  if (!accountName || accountName !== account) return next()

  // instance new client for each target subaccount
  for (const subaccount of sites) {
    // skip the main account
    if (subaccount.name !== account) {
      const broadcasterClient = new BroadcasterClient(
        {
          ...ctx.vtex,
          account: subaccount.name,
          workspace: 'master',
        },
        {
          retries: RETRIES,
          timeout: TIMEOUT_MS,
        }
      )
      broadcasterClient.notify(payload).catch((error) => {
        logger.warn({
          message: 'notifySubaccount-error',
          error,
        })
      })
    }
  }
  next()
}
