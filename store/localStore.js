//this is not a vuex-store! but a file for our localforage store
import localforage from 'localforage'
import migrationSteps from './migration/localStore'

export const STORE_META = 'meta'
export const STORE_SETTINGS = 'settings'
export const STORE_CURRENCIES = 'currencies'
export const STORE_WALLET = 'wallet'

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
  stores[STORE_WALLET] = localforage.createInstance({
    name: process.env.appName,
    version: 1.0,
    storeName: STORE_WALLET, // Should be alphanumeric, with underscores.
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

    remove(storeName, key) {
      stores[storeName].removeItem(key)
    }

  }
}
