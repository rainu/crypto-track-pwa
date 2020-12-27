//this is not a vuex-store! but a file for our localforage store
import localforage from 'localforage'
import migrationSteps from './migration/localStore'

export const STORE_META = 'meta'
export const STORE_SETTINGS = 'settings'
export const STORE_CURRENCIES = 'currencies'
export const STORE_WALLETS = 'wallets'
export const STORE_TRANSACTIONS = 'transactions'
export const STORE_COURSES = 'courses'
export const STORE_BALANCES = 'balances'
export const STORE_TOTALS = 'totals'

const createInstance = (stores, storeName) => {
  stores[storeName] = localforage.createInstance({
    name: process.env.appName,
    version: 1.0,
    storeName: storeName, // Should be alphanumeric, with underscores.
  })
}

export function newLocalStore() {
  const stores = {}
  createInstance(stores, STORE_META)
  createInstance(stores, STORE_SETTINGS)
  createInstance(stores, STORE_CURRENCIES)
  createInstance(stores, STORE_WALLETS)
  createInstance(stores, STORE_TRANSACTIONS)
  createInstance(stores, STORE_COURSES)
  createInstance(stores, STORE_BALANCES)
  createInstance(stores, STORE_TOTALS)

  const $migrate = () => {
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
          })
          .then(() => {
            return stores[STORE_META].setItem(KEY_VERSION, i + 1)
          })
        }

        return p
      })
  }

  return {
    ready() {
      return Promise.all(Object.values(stores).map(
        store => store.ready()
      ))
      .then(() => $migrate())
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

    getKeys(storeName) {
      return stores[storeName].keys()
    },

    remove(storeName, key) {
      stores[storeName].removeItem(key)
    },

    clear(storeName) {
      return stores[storeName].clear()
    }

  }
}
