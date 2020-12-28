import Vue from "vue"
import * as dateFN from 'date-fns'
import * as cmc from '@/crawler/crypto/coinmarketcap'
import * as forex from '@/crawler/fiat/forexsb'
import {STORE_META} from "@/store/localStore";
import {LSK_COURSE_STORES_PREFIX} from "@/store/courseStore";

const cryptoCurrencyBirthday = dateFN.parseISO('2009-01-03T00:00:00')

const genCourseKey = (course) => dateFN.format(course.date, 'yyyy_MM_dd')

const genRequestFN = (ctx, axios) => (url) => axios.get(`${ctx.rootState.settings.cors.proxy}${url}`)
const genSaveFN = (ctx) => (course) => {
  let reciprocalCourse = {...course}
  reciprocalCourse.from = course.to
  reciprocalCourse.to = course.from
  reciprocalCourse.open = 1 / course.open
  reciprocalCourse.close = 1 / course.close
  reciprocalCourse.high = 1 / course.high
  reciprocalCourse.low = 1 / course.low

  return Promise.all([
    ctx.dispatch('saveCourse', course),
    ctx.dispatch('saveCourse', reciprocalCourse),
  ])
}

export const state = () => ({
  ticker: {}
})

export const mutations = {
  setCourse(state, course) {
    let key = `${course.from.type}_${course.from.name}__${course.to.type}_${course.to.name}`
    Vue.set(state.ticker, key, course)
  },
}

export const getters = {
  byCourse: (state) => (from, to) => {
    let key = `${from.type}_${from.name}__${to.type}_${to.name}`
    return state.ticker[key]
  },
}

export const actions = {
  getLastCourseDate(ctx, {from, to}){
    return this.$courseStore.getKeys(from, to)
      .then(keys => {
        return keys ? keys.sort()[keys.length - 1] : null
      })
      .then(lastKey => {
        return lastKey ? dateFN.parse(lastKey,'yyyy_MM_dd', new Date()) : null
      })
  },
  getCourseAmount(ctx, course){
    return this.$courseStore.getKeys(course.from, course.to)
      .then(keys => keys.length)
  },
  getCourse(ctx, course){
    return this.$courseStore.get(course.from, course.to, genCourseKey(course))
  },
  getHistoricalCourse(ctx, {course, backSteps = 0}){
    //we have to fill gaps (at the weekend/hollidays we have no courses)
    return this.$courseStore.get(course.from, course.to, genCourseKey(course))
      .then(value => {
        if(value) {
          return Promise.resolve(value)
        }

        if(backSteps >= 7 || backSteps < 0) {
          //go MAX 7 days back
          return Promise.resolve(value)
        }

        //go one day back
        let nextCourse = {...course}
        nextCourse.date = dateFN.addDays(nextCourse.date, -1)

        return ctx.dispatch('getHistoricalCourse', {course: nextCourse, backSteps: backSteps + 1})
          .then(value => {
            //we have to set the original date instead the "real" date
            if(value) value.date = course.date
            return value
          })
      })
  },
  getPairs(ctx) {
    return this.$localStore.getKeys(STORE_META)
      .then(keys => keys.filter(k => k.startsWith(LSK_COURSE_STORES_PREFIX)))
      .then(keys => keys.map(k => {
        let rawPair = k.split(LSK_COURSE_STORES_PREFIX)[1]
        let rawPairSplit = rawPair.split('__')
        let rawFrom = rawPairSplit[0]
        let rawFromSplit = rawFrom.split('_')
        let rawTo = rawPairSplit[1]
        let rawToSplit = rawTo.split('_')

        return {
          from: {type: rawFromSplit[0], name: rawFromSplit[1]},
          to: {type: rawToSplit[0], name: rawToSplit[1]},
        }
      }))
  },
  saveCourse(ctx, course) {
    return this.$courseStore.set(course.from, course.to, genCourseKey(course), course)
  },
  updateFiat(ctx, {symbolFrom, symbolTo}){
    const reqFN = genRequestFN(ctx, this.$axios)
    const saveFN = genSaveFN(ctx)

    return ctx.dispatch('getLastCourseDate', {
        from: { type: 'fiat', name: symbolFrom },
        to: { type: 'fiat', name: symbolTo }
      }).then(lastDate => {
        return forex.newCrawler(reqFN, saveFN)
          .crawl(symbolFrom, symbolTo, lastDate || cryptoCurrencyBirthday)
      })
  },
  updateCrypto(ctx, {symbol, slug}){
    const reqFN = genRequestFN(ctx, this.$axios)
    const saveFN = genSaveFN(ctx)

    return ctx.dispatch('getLastCourseDate', {
        from: { type: 'crypto', name: symbol },
        to: { type: 'fiat', name: 'USD' }
      }).then(lastDate => {
        return cmc.newCrawler(reqFN, saveFN)
          .crawl(symbol, slug, lastDate || cryptoCurrencyBirthday)
      })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  getters,
  actions
}
