import { STORE_CURRENCIES, STORE_WALLETS, STORE_TRANSACTIONS, STORE_SETTINGS } from "./localStore"

let applyBackupFor = ($localStore, storeName, content) => {
  return $localStore.clear(storeName)
    .then(() => Object.entries(content).map(([key, value]) => $localStore.set(storeName, key, value)))
    .then(promises => Promise.all(promises))
}

export const actions = {
  getBackupContent(ctx){
    return Promise.all([
      this.$localStore.getAllEntries(STORE_CURRENCIES),
      this.$localStore.getAllEntries(STORE_WALLETS),
      this.$localStore.getAllEntries(STORE_TRANSACTIONS),
      this.$localStore.getAllEntries(STORE_SETTINGS),
    ]).then(([currencies, wallets, transactions, settings]) => {
      return { currencies, wallets, transactions, settings }
    })
  },
  applyBackup(ctx, content) {
    debugger
    return Promise.all([
      applyBackupFor(this.$localStore, STORE_CURRENCIES, content.currencies),
      applyBackupFor(this.$localStore, STORE_WALLETS, content.wallets),
      applyBackupFor(this.$localStore, STORE_TRANSACTIONS, content.transactions),
      applyBackupFor(this.$localStore, STORE_SETTINGS, content.settings),
    ])
  }
}

export default {
  namespaced: true,
  actions
}
