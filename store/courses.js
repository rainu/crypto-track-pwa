import * as dateFN from 'date-fns'
import * as cmc from '@/crawler/crypto/coinmarketcap'
import * as forex from '@/crawler/fiat/forexsb'

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

const actions = {
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
  actions
}
