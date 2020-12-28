import Vuex from "vuex";
import settings from './settings'
import currencies from './currencies'
import wallets from './wallets'
import transactions from './transactions'
import backup from './backup'
import courses from './courses'
import balances from './balances'
import webworker from './webworker'

const createStore = () => {
  return new Vuex.Store({
    modules: {
      settings, currencies, transactions, wallets, backup, courses, balances, webworker
    },
  })
}

export default createStore;
