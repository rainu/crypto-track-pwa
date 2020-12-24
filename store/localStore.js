//this is not a vuex-store! but a file for our localforage store
import localforage from 'localforage'
import migrationSteps from './migration/localStore'

export const STORE_META = 'meta'
export const STORE_SETTINGS = 'settings'
export const STORE_CURRENCIES = 'currencies'
export const STORE_WALLETS = 'wallets'
export const STORE_TRANSACTIONS = 'transactions'

export function newLocalStore() {
  const stores = {}
  stores[STORE_META] = localforage.createInstance({
    name: process.env.appName,
    version: 1.0,
    storeName: STORE_META, // Should be alphanumeric, with underscores.
  })
  stores[STORE_SETTINGS] = localforage.createInstance({
    name: process.env.appName,
    version: 1.0,
    storeName: STORE_SETTINGS, // Should be alphanumeric, with underscores.
  })
  stores[STORE_CURRENCIES] = localforage.createInstance({
    name: process.env.appName,
    version: 1.0,
    storeName: STORE_CURRENCIES, // Should be alphanumeric, with underscores.
  })
  stores[STORE_WALLETS] = localforage.createInstance({
    name: process.env.appName,
    version: 1.0,
    storeName: STORE_WALLETS, // Should be alphanumeric, with underscores.
  })
  stores[STORE_TRANSACTIONS] = localforage.createInstance({
    name: process.env.appName,
    version: 1.0,
    storeName: STORE_TRANSACTIONS, // Should be alphanumeric, with underscores.
  })

  return {
    ready() {
      return Promise.all(Object.values(stores).map(
        store => store.ready()
      ))
      .then(() => this.$migrate())
    },

    $migrate(){
      const KEY_VERSION = 'version.store'

      //get the current schema version
      return stores[STORE_META].getItem(KEY_VERSION)
      .then(storeVersion => {
        let currentMigrationVersion = storeVersion ? storeVersion : 0

        let p = Promise.resolve()
        for(let i = currentMigrationVersion; i < migrationSteps.length; i++) {
          p = p.then(() => {
            console.log(`Migration: do Step ${i + 1} of ${migrationSteps.length}`)
            return migrationSteps[i](stores)
          }).then(() => {
            return stores[STORE_META].setItem(KEY_VERSION, i + 1)
          })
        }

        return p
      })
    },

    set(storeName, key, value) {
      return stores[storeName].setItem(key, value)
    },

    get(storeName, key) {
      return stores[storeName].getItem(key)
    },

    getAll(storeName){
      return stores[storeName].keys()
        .then(keys => keys.map(id => this.get(storeName, id)))
        .then(promises => Promise.all(promises))
    },

    getAllEntries(storeName) {
      let result = {}

      return stores[storeName]
        .iterate((v, k) => { result[k] = v})
        .then(() => result)
    },

    remove(storeName, key) {
      stores[storeName].removeItem(key)
    },

    clear(storeName) {
      return stores[storeName].clear()
    }

  }
}
