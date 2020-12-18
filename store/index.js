import Vuex from "vuex";
import settings from './settings'
import currencies from './currencies'
import wallets from './wallets'
import transactions from './transactions'

const createStore = () => {
  return new Vuex.Store({
    modules: {
      settings, currencies, transactions, wallets
    },
  })
}

export default createStore;
