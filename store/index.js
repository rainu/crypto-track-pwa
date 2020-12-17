import Vuex from "vuex";
import settings from './settings'
import currencies from './currencies'
import wallets from './wallets'

const createStore = () => {
  return new Vuex.Store({
    modules: {
      settings, currencies, wallets
    },
  })
}

export default createStore;
