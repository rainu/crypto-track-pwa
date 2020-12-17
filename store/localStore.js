//this is not a vuex-store! but a file for our localforage store
import localforage from 'localforage'

export const STORE_META = 'meta'
export const STORE_SETTINGS = 'settings'

export function newLocalStore() {
  const store = {}
  store[STORE_META] = localforage.createInstance({
    name: process.env.appName,
    version: 1.0,
    storeName: 'meta', // Should be alphanumeric, with underscores.
  })
  store[STORE_SETTINGS] = localforage.createInstance({
    name: process.env.appName,
    version: 1.0,
    storeName: 'settings', // Should be alphanumeric, with underscores.
  })

  return {
    ready() {
      return Promise.all([
        store.meta.ready(),
        store.settings.ready(),
      ])
    },

    set(storeName, key, value) {
      return store[storeName].setItem(key, value)
    },

    get(storeName, key) {
      return store[storeName].getItem(key)
    },

    remove(storeName, key) {
      store[storeName].removeItem(key)
    }

  }
}
