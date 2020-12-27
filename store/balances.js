import * as dateFN from 'date-fns'
import { newBalanceCalculator, newTotalsCalculator } from "@/functions/balanceCalculator";
import {STORE_BALANCES, STORE_TOTALS} from "@/store/localStore";

const state = () => ({
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

const mutations = {
  setUpdateBalancesState(state, {current, total}) {
    state.updateState.balances.current = current
    state.updateState.balances.total = total
  },
  setUpdateTotalsState(state, {current, total}) {
    state.updateState.totals.current = current
    state.updateState.totals.total = total
  },
}

const actions = {
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
    const progressFN = (current, total) => ctx.commit('setUpdateBalancesState', {current, total})

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
    const progressFN = (current, total) => ctx.commit('setUpdateTotalsState', {current, total})

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
  actions,
}
