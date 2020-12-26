import Vue from 'vue'
import * as LocalStore from '../store/localStore'
import * as CourseStore from '../store/courseStore'

const localStore = LocalStore.newLocalStore()
const courseStore = CourseStore.newCourseStore(localStore)

Vue.prototype.$localStore = localStore
Vue.prototype.$courseStore = courseStore

//we have to wait for our indexdb(localforage) instances to be ready
export default function ({app, store}) {
  app.$localStore = localStore
  store.$localStore = localStore

  app.$courseStore = courseStore
  store.$courseStore = courseStore

  return localStore.ready()
    .then(() => courseStore.ready())
}
