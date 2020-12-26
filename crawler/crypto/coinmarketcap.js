import cheerio from 'cheerio'
import * as dateFN from 'date-fns'

const fakeSave = (course) => {
  return new Promise(resolve => {
    console.log('[SAVE]', course)
    resolve()
  })
}

export const newCrawler = (requestFN, saveFN = fakeSave) => {
  const parse = (symbol, content) => {
    const $ = cheerio.load(content)

    //the whole data is stored inside a script tag
    let data = JSON.parse($('#__NEXT_DATA__').get()[0].children[0].data)
    data = Object.values(data.props.initialState.cryptocurrency.ohlcvHistorical)[0].quotes
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
    crawl(symbol, slug, startDate){
      const start = dateFN.format(startDate, 'yyyyMMdd')
      const end = dateFN.format(dateFN.addDays(new Date(), -1), 'yyyyMMdd')
      const url = `https://coinmarketcap.com/currencies/${slug}/historical-data/?start=${start}&end=${end}`

      return requestFN(url)
        .then((resp) => parse(symbol, resp.data))
        .then(courses => courses.map(course => saveFN(course)) )
    }
  }
}
