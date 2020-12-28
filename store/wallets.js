import {calculateBalances, addToBalance} from '@/functions/balances_helper'
import {STORE_WALLETS} from "./localStore";

export const state = () => ({
  wallets: [],
})

export const mutations = {
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

export const actions = {
  init(ctx){
    return Promise.all([
      this.$localStore.getAll(STORE_WALLETS)
        .then(wallets => {
          for(let wallet of wallets){
            ctx.commit('addWallet', wallet)
          }
        })
    ])
  },
  addWallet(ctx, wallet) {
    ctx.commit('addWallet', wallet)
    return this.$localStore.set(STORE_WALLETS, wallet.id, wallet)
  },
  saveWallet(ctx, wallet) {
    ctx.commit('setWallet', wallet)
    return this.$localStore.set(STORE_WALLETS, wallet.id, wallet)
  },
  deleteWallet(ctx, walletId) {
    ctx.commit('deleteWallet', walletId)
    return this.$localStore.remove(STORE_WALLETS, walletId)
  },
}

export const getters = {
  byId: (state) => (id) => {
    return state.wallets.find(w => w.id === id)
  },
  transactions: (state, getters, rootState) => (id) => {
    return rootState.transactions.transactions.filter(tx => {
      if(tx.involvedWallets.findIndex(wId => wId === id) === -1){
        //this transaction has nothing to do with the given wallet
        return false;
      }

      return true;
    });
  },
  balances: (state, getters, rootState) => (id) => {
    let wallet = getters.byId(id)
    let transactions = getters.transactions(id)
    return calculateBalances(wallet, transactions);
  },
  totalBalances: (state, getters, rootState) => () => {
    let balances = []

    for(let curWallet of state.wallets) {
      let curWalletBalances = getters.balances(curWallet.id)

      for(let curBalance of curWalletBalances) {
        addToBalance(balances, curBalance.currency, curBalance.amount)
      }
    }

    return balances;
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
