import Vuex from "vuex";
import settings from './settings'

const createStore = () => {
  return new Vuex.Store({
    modules: {
      settings
    },
  })
}

export default createStore;
