import Vue from "vue"
import * as dateFN from 'date-fns'
import { newBalanceCalculator, newTotalsCalculator } from "@/functions/balanceCalculator";
import {STORE_BALANCES, STORE_TOTALS} from "@/store/localStore";

export const state = () => ({
  currentBalances: null,
  currentTotals: {},
  updateState: {
    balances: {
      current: null,
      total: null,
    },
    totals: {
      current: null,
      total: null,
    }
  }
})

export const mutations = {
  setCurrentBalances(state, balances) {
    state.currentBalances = balances
  },
  setCurrentTotal(state, {dstCurrency, amount}) {
    Vue.set(state.currentTotals, `${dstCurrency.type}_${dstCurrency.name}`, amount)
  },
  setUpdateBalancesState(state, {current, total}) {
    state.updateState.balances.current = current
    state.updateState.balances.total = total
  },
  setUpdateTotalsState(state, {current, total}) {
    state.updateState.totals.current = current
    state.updateState.totals.total = total
  },
}

export const getters = {
  currentBalance: (state) => (currency) => {
    let found = state.currentBalances.filter(b => b.currency.type === currency.type && b.currency.name === currency.name)

    if(found.length === 0) return null

    return found[0]
  }
}

export const actions = {
  init(ctx){
    return ctx.dispatch('calcCurrentBalances')
      .then(() => ctx.dispatch('calcCurrentTotals', ctx.rootState.settings.balances.dstCurrency))
  },
  calcCurrentBalances(ctx){
    const saveBalancesAt = (balances, at) => {
      ctx.commit('setCurrentBalances', balances)
      return Promise.resolve()
    }
    const balanceCalc = newBalanceCalculator(saveBalancesAt)

    let now = new Date()
    return balanceCalc.calcHistoricalBalances(
      ctx.rootState.transactions.transactions,
      now,
      now
    )
  },
  calcCurrentTotals(ctx, dstCurrency){
    const getHistoricalCourse = (from, to, date) => {
      let currentValue = ctx.rootGetters['courses/byCourse'](from, to)
      if(currentValue) {
        return Promise.resolve({
          //the calculator expect the course value at field "close" -> so here we remap it
          close: currentValue.value
        })
      }

      //there is no ticker value available right now -> use the latest historical one
      return ctx.dispatch('courses/getHistoricalCourse', {course: {from, to, date}}, { root: true })
    }

    const getHistoricalBalances = (date) => {
      if(ctx.rootState.balances.currentBalances) {
        return Promise.resolve(ctx.rootState.balances.currentBalances)
      }

      //there is no current balances available right now -> use the latest historical one
      return ctx.dispatch('getHistoricalBalancesAt', date)
    }
    const saveTotalAmountAt = (amount, dstCurrency, date) => {
      ctx.commit('setCurrentTotal', {dstCurrency, amount})
      return Promise.resolve()
    }

    const totalsCalc = newTotalsCalculator(getHistoricalCourse, getHistoricalBalances, saveTotalAmountAt)

    let now = new Date()
    return ctx.dispatch('courses/getPairs', null, { root: true })
      .then(pairs => {
        return totalsCalc.calcHistoricalTotals(
          pairs,
          dstCurrency,
          now,
          now,
        )
      })
  },
  getLastBalancesCalcDate(ctx){
    return this.$localStore.getKeys(STORE_BALANCES)
      .then(keys => keys ? keys.sort()[keys.length - 1] : null)
      .then(rawDate => rawDate ? dateFN.parse(rawDate, 'yyyy_MM_dd', new Date()): null)
  },
  getHistoricalBalancesAt(ctx, at) {
    return this.$localStore.get(STORE_BALANCES, dateFN.format(at, 'yyyy_MM_dd'))
  },
  saveBalancesAt(ctx, {balances, at}) {
    return this.$localStore.set(STORE_BALANCES, dateFN.format(at, 'yyyy_MM_dd'), balances)
  },
  getLastTotalsCalcDate(ctx, dstCurrency){
    return this.$localStore.getKeys(STORE_TOTALS)
      .then(keys => keys.filter(k => k.endsWith(`__${dstCurrency.type}_${dstCurrency.name}`)))
      .then(keys => keys ? keys.sort()[keys.length - 1] : null)
      .then(key => key ? key.split('__')[0] : null)
      .then(rawDate => rawDate ? dateFN.parse(rawDate, 'yyyy_MM_dd', new Date()): null)
  },
  saveTotalAmountAt(ctx, {amount, dstCurrency, date}){
    let key = `${dateFN.format(date, 'yyyy_MM_dd')}__${dstCurrency.type}_${dstCurrency.name}`
    return this.$localStore.set(STORE_TOTALS, key, amount)
  },
  updateBalances(ctx){
    const saveBalancesAt = (balances, at) => ctx.dispatch('saveBalancesAt', {balances, at})
    const progressFN = (current, total) => ctx.commit('setUpdateBalancesState', {current: ctx.state.updateState.balances.current + 1, total})

    const balanceCalc = newBalanceCalculator(saveBalancesAt)

    //reset progress
    ctx.commit('setUpdateBalancesState', {current: null, total: null})

    return ctx.dispatch('getLastBalancesCalcDate')
      .then(date => date ? date : ctx.rootGetters["transactions/firstTransactionDate"]())
      .then(date => {
        return balanceCalc.calcHistoricalBalances(
          ctx.rootState.transactions.transactions,
          date,
          new Date(),
          progressFN
        )
      })
  },
  updateTotals(ctx, dstCurrency) {
    const getHistoricalCourse = (from, to, date) => ctx.dispatch('courses/getHistoricalCourse', {course: {from, to, date}}, { root: true })
    const getHistoricalBalances = (date) => ctx.dispatch('getHistoricalBalancesAt', date)
    const saveTotalAmountAt = (amount, dstCurrency, date) => ctx.dispatch('saveTotalAmountAt', {amount, dstCurrency, date})
    const progressFN = (current, total) => ctx.commit('setUpdateTotalsState', {current: ctx.state.updateState.totals.current + 1, total})

    const totalsCalc = newTotalsCalculator(getHistoricalCourse, getHistoricalBalances, saveTotalAmountAt)

    //reset progress
    ctx.commit('setUpdateTotalsState', {current: null, total: null})

    return Promise.all([
      ctx.dispatch('getLastTotalsCalcDate', dstCurrency).then(date => date ? date : ctx.rootGetters["transactions/firstTransactionDate"]()),
      ctx.dispatch('courses/getPairs', null, { root: true })
    ]).then(([date, pairs]) => {
      return totalsCalc.calcHistoricalTotals(
        pairs,
        dstCurrency,
        date,
        new Date(),
        progressFN
      )
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  getters,
  actions,
}
