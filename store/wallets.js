import {STORE_WALLET} from "./localStore";

const state = () => ({
  wallets: [],
})

const mutations = {
  clearWallets(state){
    state.wallets.length = 0
  },
  addWallet(state, wallet) {
    state.wallets.push(wallet)
  },
  setWallets(state, wallets) {
    state.wallets.push(...wallets)
  },
  setWallet(state, wallet) {
    let savedWallet = state.wallets.find(w => w.id === wallet.id);

    for(let key of Object.keys(savedWallet)){
      savedWallet[key] = wallet[key]
    }
  },
  deleteWallet(state, id) {
    for(let i in state.wallets){
      if(state.wallets[i].id === id) {
        state.wallets.splice(i, 1)
      }
    }
  }
}

const actions = {
  init(ctx){
    return Promise.all([
      this.$localStore.getAll(STORE_WALLET)
        .then(wallets => {
          for(let wallet of wallets){
            ctx.commit('addWallet', wallet)
          }
        })
    ])
  },
  addWallet(ctx, wallet) {
    ctx.commit('addWallet', wallet)
    return this.$localStore.set(STORE_WALLET, wallet.id, wallet)
  },
  saveWallet(ctx, wallet) {
    ctx.commit('setWallet', wallet)
    return this.$localStore.set(STORE_WALLET, wallet.id, wallet)
  },
  deleteWallet(ctx, walletId) {
    ctx.commit('deleteWallet', walletId)
    return this.$localStore.remove(STORE_WALLET, walletId)
  },
}

const getters = {
  byId: (state) => (id) => {
    return state.wallets.find(w => w.id === id)
  },
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
