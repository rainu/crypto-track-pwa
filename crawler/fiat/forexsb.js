import * as dateFN from "date-fns";

const firstOfCentury = dateFN.parseISO('2000-01-01T00:00:00')

const fakeSave = (course) => {
  return new Promise(resolve => {
    console.log('[SAVE]', course)
    resolve()
  })
}

export const newCrawler = (requestFN, saveFN = fakeSave) => {
  const parse = (sFrom, sTo, startDate, content) => {
    let data = []

    for (let i = 0; i < content.bars; i++) {
      let date = dateFN.addMinutes(firstOfCentury, content.time[i])
      if(dateFN.compareAsc(date, startDate) === -1) {
        continue
      }

      data.push({
        from: {
          type: 'fiat',
          name: sFrom,
        },
        to: {
          type: 'fiat',
          name: sTo,
        },
        date: date,
        open: content.open[i],
        close: content.close[i],
        high: content.high[i],
        low: content.low[i],
      })
    }

    return data
  }

  return {
    crawl(symbolFrom, symbolTo, startDate) {
      const url = `https://data.forexsb.com/${symbolFrom}${symbolTo}1440.gz`
      return requestFN(url)
        .then(resp => parse(symbolFrom, symbolTo, startDate, resp.data))
        .then(courses => courses.map(course => saveFN(course)))
    }
  }
}
