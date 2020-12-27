import {STORE_META} from "./localStore";
import localforage from "localforage";
import migrationSteps from "./migration/courseStore";

export const LSK_COURSE_STORES_PREFIX = "course.stores."
const KEY_VERSION = 'version'

const createInstance = (storeName) => {
  return localforage.createInstance({
    name: `${process.env.appName}-courses`,
    version: 1.0,
    storeName: storeName, // Should be alphanumeric, with underscores.
  })
}

export function newCourseStore($localStore) {
  const stores = {}

  const genStoreName = (from, to) => `${from.type}_${from.name}__${to.type}_${to.name}`
  const getStore = (from, to) => {
    const storeName = genStoreName(from, to)
    let promise = Promise.resolve()

    if(!stores[storeName]) {
      stores[storeName] = createInstance(storeName)

      promise = $localStore.getKeys(STORE_META)
        .then(keys => keys.includes(`${LSK_COURSE_STORES_PREFIX}${storeName}`))
        .then(exists => {
          if(!exists){
            let value = {}
            value[KEY_VERSION] = migrationSteps.length
            return $localStore.set(STORE_META, `${LSK_COURSE_STORES_PREFIX}${storeName}`, value)
          }
          return Promise.resolve()
        })
    }

    return promise.then(() => stores[storeName])
  }

  const $migrate = (storeName) => {
    //get the current schema version
    return $localStore.get(STORE_META, `${LSK_COURSE_STORES_PREFIX}${storeName}`)
      .then(storeMetaData => {
        let currentMigrationVersion = storeMetaData && storeMetaData[KEY_VERSION] ? storeMetaData[KEY_VERSION] : 0

        let p = Promise.resolve()
        for(let i = currentMigrationVersion; i < migrationSteps.length; i++) {
          p = p.then(() => {
            console.log(`Course Migration: do Step ${i + 1} of ${migrationSteps.length}`)
            return migrationSteps[i](stores[storeName])
          })
          .then(() => {
            storeMetaData[KEY_VERSION] += 1
            return $localStore.set(STORE_META, `${LSK_COURSE_STORES_PREFIX}${storeName}`, storeMetaData)
          })
        }

        return p
      })
  }

  return {
    ready(){
      return $localStore.getKeys(STORE_META)
        .then(keys => keys.filter(k => k.startsWith(LSK_COURSE_STORES_PREFIX)))
        .then(keys => keys.map(k => k.split(LSK_COURSE_STORES_PREFIX)[1]))
        .then(courseStoreNames => courseStoreNames.map(storeName => {
          stores[storeName] = createInstance(storeName)
          return stores[storeName].ready().then(() => $migrate(storeName))
        }))
        .then(readPromises => Promise.all(readPromises))
    },

    set(from, to, key, value) {
      return getStore(from, to).then(store => store.setItem(key, value))
    },

    get(from, to, key) {
      return getStore(from, to).then(store => store.getItem(key))
    },

    getAll(from, to){
      return getStore(from, to).then(store => store.keys())
        .then(keys => keys.map(id => this.get(from, to, id)))
        .then(promises => Promise.all(promises))
    },

    getAllEntries(from, to) {
      let result = {}

      return getStore(from, to).then(store => store
        .iterate((v, k) => { result[k] = v})
        .then(() => result)
      )
    },

    getKeys(from, to) {
      return getStore(from, to).then(store => store.keys())
    },

    remove(from, to, key) {
      getStore(from, to).then(store => store.removeItem(key))
    },

    clear(from, to) {
      return getStore(from, to).then(store => store.clear())
    }
  }
}
