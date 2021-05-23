import Vue from 'vue'
import {STORE_CURRENCIES} from "./localStore"

export const state = () => ({
  currencies: {
    "fiat": {},
    "crypto": {},
  }
})

export const mutations = {
  setCurrency(state, currency) {
    Vue.set(state.currencies[currency.type], currency.key, currency)

    if(currency.type === 'crypto' && currency.crawler && currency.crawler.coinmarketcap && currency.crawler.coinmarketcap.id) {
      this.$webworker.cmcWorker.watchCurrency(currency.crawler.coinmarketcap.id)
    } else if(currency.type === 'fiat' && currency.crawler && currency.crawler.finnhub && currency.crawler.finnhub.symbol) {
      this.$webworker.fhWorker.watchCurrency(currency.crawler.finnhub.symbol)
    }
  },
  deleteCurrency(state, currency) {
    Vue.delete(state.currencies[currency.type], currency.key)
  }
}

export const getters = {
  getCurrency: (state) => (type, name) => {
    if(state.currencies && state.currencies[type]) {
      return state.currencies[type][name]
    }

    return null
  }
}

export const actions = {
  init(ctx) {
    return Promise.all([
      this.$localStore.getAll(STORE_CURRENCIES)
      .then(currencies => {
        for (let currency of currencies) {
          ctx.commit('setCurrency', currency)
        }
      })
    ])
  },
  updateCurrency(ctx, currency) {
    const key = `${currency.type}_${currency.key}`
    return this.$localStore.set(STORE_CURRENCIES, key, currency)
      .then(() => ctx.commit('setCurrency', currency))
  },
  deleteCurrency(ctx, {type, name}) {
    return ctx.dispatch('courses/getPairs', {}, { root: true })
      .then(pairs => {
        return pairs.filter(p => (p.from.type === type && p.from.name === name) || (p.to.type === type && p.to.name === name))
      })
      .then(involvedPairs => {
        let p = involvedPairs.map(p => ctx.dispatch('courses/clearCourses', p, {root: true}))
        return Promise.all(p)
      })
      .then(() => this.$localStore.remove(STORE_CURRENCIES, `${type}_${name}`))
      .then(() => ctx.commit('deleteCurrency', {type, key: name}))
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  getters,
  actions
}
