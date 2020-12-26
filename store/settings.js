import i18n from '../locales'
import {STORE_SETTINGS} from "./localStore"

const LSK_LANGUAGE = 'language'
const LSK_DARKMODE = 'darkmode'
const LSK_PAGE_SIZE_TX = 'paging.transaction'
const LSK_DATE_TIME_FORMAT = 'date.timeFormat'
const LSK_DATE_FIRST_DAY = 'date.firstDay'
const LSK_CORS_PROXY = 'cors.proxy'

export const state = () => ({
  locales: i18n.locales,
  locale: i18n.defaultLocale,
  date: {
    timeFormat: '24hr',
    firstDayOfWeek: 1
  },
  theme: {
    dark: true,
  },
  paging: {
    transaction: 5
  },
  cors: {
    proxy: 'https://cors-anywhere.herokuapp.com/'
  }
})

export const mutations = {
  setLang(state, lang) {
    if (state.locales.indexOf(lang) !== -1) {
      state.locale = lang
    }
  },
  setThemeDarkMode(state, dark) {
    state.theme.dark = dark
  },
  setTransactionPaging(state, pageSize) {
    state.paging.transaction = pageSize
  },
  setDateTimeFormat(state, format) {
    state.date.timeFormat = format
  },
  setDateFirstDay(state, day) {
    state.date.firstDayOfWeek = day
  },
  setCorsProxy(state, proxy) {
    state.cors.proxy = proxy
  },
}

export const getters = {}

export const actions = {
  init(ctx) {
    return Promise.all([
      this.$localStore.get(STORE_SETTINGS, LSK_LANGUAGE)
        .then(lang => {
          if(lang){
            return ctx.dispatch('applyLanguage', lang)
          }
        }),
      this.$localStore.get(STORE_SETTINGS, LSK_DARKMODE)
        .then(dark => {
          if(dark !== null) {
            return ctx.dispatch('applyThemeDark', dark)
          } else {
            //if there is no settings (fresh install) - apply the default theme mode here
            return ctx.dispatch('applyThemeDark', true)
          }
        }),
      this.$localStore.get(STORE_SETTINGS, LSK_PAGE_SIZE_TX)
        .then(pageSize => {
          if(pageSize !== null) {
            return ctx.dispatch('setTransactionPaging', pageSize)
          }
        }),
      this.$localStore.get(STORE_SETTINGS, LSK_DATE_TIME_FORMAT)
        .then(format => {
          if(format) {
            return ctx.commit('setDateTimeFormat', format)
          }
        }),
      this.$localStore.get(STORE_SETTINGS, LSK_DATE_FIRST_DAY)
        .then(day => {
          if(day) {
            return ctx.commit('setDateFirstDay', day)
          }
        }),
      this.$localStore.get(STORE_SETTINGS, LSK_CORS_PROXY)
        .then(proxy => {
          if(proxy) {
            return ctx.commit('setCorsProxy', proxy)
          }
        }),
    ])
  },

  setLang(ctx, lang) {
    ctx.commit('setLang', lang)
    return this.$localStore.set(STORE_SETTINGS, LSK_LANGUAGE, ctx.state.locale)
  },
  setThemeDarkMode(ctx, dark) {
    ctx.commit('setThemeDarkMode', dark)
    return this.$localStore.set(STORE_SETTINGS, LSK_DARKMODE, dark)
  },
  setTransactionPaging(ctx, pageSize) {
    ctx.commit('setTransactionPaging', pageSize)
    return this.$localStore.set(STORE_SETTINGS, LSK_PAGE_SIZE_TX, pageSize)
  },
  setDateTimeFormat(ctx, format) {
    ctx.commit('setDateTimeFormat', format)
    return this.$localStore.set(STORE_SETTINGS, LSK_DATE_TIME_FORMAT, format)
  },
  setDateFirstDay(ctx, day) {
    ctx.commit('setDateFirstDay', day)
    return this.$localStore.set(STORE_SETTINGS, LSK_DATE_FIRST_DAY, day)
  },
  setCorsProxy(ctx, proxy) {
    ctx.commit('setCorsProxy', proxy)
    return this.$localStore.set(STORE_SETTINGS, LSK_CORS_PROXY, proxy)
  },

  applyLanguage(ctx, lang) {
    this.app.i18n.locale = lang
    return ctx.dispatch('setLang', lang)
  },
  applyThemeDark(ctx, dark) {
    this.app.vuetify.framework.theme.isDark = dark
    return ctx.dispatch('setThemeDarkMode', dark)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  getters,
  actions
}
