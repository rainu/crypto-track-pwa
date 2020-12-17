import i18n from '../locales'
import {STORE_SETTINGS} from "./localStore"

const LSK_LANGUAGE = 'language'
const LSK_DARKMODE = 'darkmode'

export const state = () => ({
  locales: i18n.locales,
  locale: i18n.defaultLocale,
  theme: {
    dark: true,
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
      this.$localStore.get(STORE_SETTINGS, 'darkmode')
        .then(dark => {
          if(dark !== null) {
            return ctx.dispatch('applyThemeDark', dark)
          } else {
            //if there is no settings (fresh install) - apply the default theme mode here
            return ctx.dispatch('applyThemeDark', true)
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

  applyLanguage(ctx, lang) {
    this.app.i18n.locale = lang
    return ctx.dispatch('setLang', lang)
  },
  applyThemeDark(ctx, dark) {
    this.app.vuetify.framework.theme.isDark = dark
    return ctx.dispatch('setThemeDarkMode', dark)
  },
}

export default {
  namespaced: true,
  state,
  mutations,
  getters,
  actions
}
