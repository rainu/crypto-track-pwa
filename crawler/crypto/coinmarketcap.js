import * as dateFN from 'date-fns'

const fakeSave = (course) => {
  return new Promise(resolve => {
    console.log('[SAVE]', course)
    resolve()
  })
}

export const newCrawler = (requestFN, saveFN = fakeSave) => {
  const parse = (symbol, content) => {
    let data = content.data.quotes
    data = data.map(q => {
      let course = q.quote.USD
      return {
        date: dateFN.parse(course.timestamp.split('T')[0], "yyyy-MM-dd", new Date()),
        from: {
          name: symbol,
          type: 'crypto'
        },
        to: {
          name: 'USD',
          type: 'fiat'
        },
        open: course.open,
        high: course.high,
        low: course.low,
        close: course.close,
      }
    })

    return data
  }

  return {
    crawl(symbol, id, startDate){
      const start = dateFN.getUnixTime(startDate)
      const end = dateFN.getUnixTime(dateFN.addDays(new Date(), -1))
      const url = `https://web-api.coinmarketcap.com/v1/cryptocurrency/ohlcv/historical?id=${id}&convert=USD&time_start=${start}&time_end=${end}`

      return requestFN(url)
        .then((resp) => parse(symbol, resp.data))
        .then(courses => courses.map(course => saveFN(course)) )
    }
  }
}
