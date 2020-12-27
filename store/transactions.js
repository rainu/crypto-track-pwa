import {uniq} from '@/functions/currencies'
import {STORE_TRANSACTIONS} from "@/store/localStore";

const state = () => ({
  transactions: [],
})

const mutations = {
  clearTransactions(state){
    state.transactions.length = 0
  },
  addTransaction(state, transaction) {
    state.transactions.push(transaction)
  },
  setTransactions(state, transactions) {
    state.transactions.push(...transactions)
  },
  setTransaction(state, transaction) {
    let savedTx = state.transactions.find(t => t.id === transaction.id);

    for(let key of Object.keys(savedTx)){
      savedTx[key] = transaction[key]
    }
  },
  deleteTransaction(state, id) {
    for(let i in state.transactions){
      if(state.transactions[i].id === id) {
        state.transactions.splice(i, 1)
      }
    }
  }
}

const actions = {
  init(ctx){
    return Promise.all([
      this.$localStore.getAll(STORE_TRANSACTIONS)
      .then(transactions => {
        for(let tx of transactions){
          ctx.commit('addTransaction', tx)
        }
      })
    ])
  },
  addTransaction(ctx, transaction) {
    ctx.commit('addTransaction', transaction)
    return this.$localStore.set(STORE_TRANSACTIONS, transaction.id, transaction)
  },
  saveTransaction(ctx, transaction) {
    ctx.commit('setTransaction', transaction)
    return this.$localStore.set(STORE_TRANSACTIONS, transaction.id, transaction)
  },
  deleteTransaction(ctx, transactionId) {
    ctx.commit('deleteTransaction', transactionId)
    return this.$localStore.remove(STORE_TRANSACTIONS, transactionId)
  },
}

const getters = {
  byId: (state) => (id) => {
    return state.transactions.find(t => t.id === id)
  },
  involvedCurrencies: (state) => () => {
    let currencies = [];

    for(let tx of state.transactions) {
      currencies.push(...tx.involvedCurrencies)
    }

    currencies = uniq(currencies);
    return currencies;
  },
  firstTransactionDate: (state) => () => {
    if(!state.transactions || state.transactions.length === 0) return null

    let tx = [...state.transactions]
    tx.sort((a, b) => (new Date(a.date) - new Date(b.date)))

    return new Date(tx[0].date)
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
