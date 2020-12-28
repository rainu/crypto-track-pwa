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

    if(currency.type === 'crypto' && currency.crawler && currency.crawler.coinmarketcap && currency.crawler.coinmarketcap.id) {
      this.$webworker.cmcWorker.watchCurrency(currency.crawler.coinmarketcap.id)
    } else if(currency.type === 'fiat' && currency.crawler && currency.crawler.finnhub && currency.crawler.finnhub.symbol) {
      this.$webworker.fhWorker.watchCurrency(currency.crawler.finnhub.symbol)
    }
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
