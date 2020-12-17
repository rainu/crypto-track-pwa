import Vue from 'vue'
import {STORE_CURRENCIES} from "./localStore"

export const state = () => ({
  currencies: {
    "fiat": {},
    "crypto": {},
  }
})

export const mutations = {
  addCurrency(state, currency) {
    Vue.set(state.currencies[currency.type], currency.key, currency)
  },
}

export const getters = {}

export const actions = {
  init(ctx) {
    return Promise.all([
      this.$localStore.getAll(STORE_CURRENCIES)
      .then(currencies => {
        for (let currency of currencies) {
          ctx.commit('addCurrency', currency)
        }
      })
    ])
  },
}

export default {
  namespaced: true,
  state,
  mutations,
  getters,
  actions
}
