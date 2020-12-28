import Vue from 'vue'
import Vuelidate from 'vuelidate'

//init stuff here
Vue.use(Vuelidate)

export default function ({app, store}) {
  return Promise.all([
    store.dispatch('settings/init'),
    store.dispatch('currencies/init'),
    store.dispatch('wallets/init'),
    store.dispatch('transactions/init'),
  ])
  .then(() => store.dispatch('balances/init'))
  .then(() => Promise.all([
    app.$webworker.cmcWorker.start(),
    app.$webworker.fhWorker.start(),
  ]))
}
