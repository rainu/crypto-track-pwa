import Vuex from "vuex";
import settings from './settings'
import currencies from './currencies'
import wallets from './wallets'
import transactions from './transactions'
import backup from './backup'
import courses from './courses'

const createStore = () => {
  return new Vuex.Store({
    modules: {
      settings, currencies, transactions, wallets, backup, courses
    },
  })
}

export default createStore;
