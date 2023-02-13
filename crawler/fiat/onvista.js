import * as dateFN from "date-fns";

const fakeSave = (course) => {
  return new Promise(resolve => {
    console.log('[SAVE]', course)
    resolve()
  })
}

export const newCrawler = (requestFN, saveFN = fakeSave) => {

  return {
    crawl(symbolFrom, symbolTo, startDate) {

      return new Promise(async (resolve, reject) => {
        const now = new Date()

        for (let year = startDate.getFullYear(); year <= now.getFullYear(); year++) {
          let month = "01"
          let day = "01"

          if(year === startDate.getFullYear()) {
            month = dateFN.format(startDate,  'MM')
            day = dateFN.format(startDate, 'dd')
          }

          const url = `https://api.onvista.de/api/v1/instruments/CURRENCY/${symbolFrom}${symbolTo}/eod_history?range=Y1&startDate=${year}-${month}-${day}`
          const body = (await requestFN(url)).data

          for (let i = 0; i < body.datetimeLast.length; i++) {
            saveFN({
              from: {
                type: 'fiat',
                name: symbolFrom,
              },
              to: {
                type: 'fiat',
                name: symbolTo,
              },
              date: dateFN.fromUnixTime(body.datetimeLast[i]),
              open: body.first[i],
              close: body.last[i],
              high: body.high[i],
              low: body.low[i],
            })
          }
        }

        resolve()
      })
    }
  }

}
