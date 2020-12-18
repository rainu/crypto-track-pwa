//init stuff here

export default function ({app, store}) {
  return Promise.all([
    store.dispatch('settings/init'),
    store.dispatch('currencies/init'),
    store.dispatch('wallets/init'),
    store.dispatch('transactions/init'),
  ])
}
