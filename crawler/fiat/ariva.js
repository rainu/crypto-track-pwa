import * as dateFN from "date-fns";

const fakeSave = (course) => {
  return new Promise(resolve => {
    console.log('[SAVE]', course)
    resolve()
  })
}

export const newCrawler = (requestFN, saveFN = fakeSave) => {
  const dummyDomElement = document.createElement( 'div' )
  const parseDate = (v) => dateFN.parse(v, 'yyyy-MM-dd', new Date())
  const parseNumber = (v) => Number.parseFloat(v.replace('.', '').replace(',', '.'))

  const parse = (sFrom, sTo, startDate, csvContent) => {
    let data = []

    let isFirst = true
    csvContent.split('\n').forEach(line => {
      if(isFirst){
        //skip header: Datum;Erster;Hoch;Tief;Schlusskurs
        isFirst = false
        return
      }

      if(!line.includes(';')) {
        //skip empty lines
        return
      }

      const values = line.split(';')
      data.push({
        from: {
          type: 'fiat',
          name: sFrom,
        },
        to: {
          type: 'fiat',
          name: sTo,
        },
        date: parseDate(values[0]),
        open: parseNumber(values[1]),
        close: parseNumber(values[4]),
        high: parseNumber(values[2]),
        low: parseNumber(values[3]),
      })
    })

    return data
  }

  return {
    crawl(symbolFrom, symbolTo, startDate) {
      const url = `https://www.ariva.de/search/livesearch.m?searchname=${symbolFrom}%2F${symbolTo}`
      return requestFN(url)
        .then(resp => {
          dummyDomElement.innerHTML = resp.data

          const courseSlugPart = Array.from(dummyDomElement.getElementsByTagName("a"))
            .filter(a => a.getAttribute('id'))
            .filter(a => a.getAttribute('id').startsWith("liveSearchLink"))
            .map(a => a.getAttribute('href'))
            .find(href => href.includes('kurs'))

          if(!courseSlugPart) {
            throw new Error('Can not crawl courses from ariva!')
          }

          return requestFN(`https://www.ariva.de/${courseSlugPart}/historische_kurse`)
        })
        .then(resp => {
          dummyDomElement.innerHTML = resp.data

          let slugPart = dummyDomElement.getElementsByTagName('form').namedItem('histcsv').getAttribute('action')
          let query = Array.from(dummyDomElement.getElementsByTagName('form').namedItem('histcsv').getElementsByTagName('input'))
            .filter(i => i.getAttribute('type') === 'hidden')
            .map(i => `${i.name}=${i.value}`)
            .join('&')

          const dateFrom = dateFN.format(startDate, 'dd.MM.yyyy')
          const dateUntil = dateFN.format(new Date(), 'dd.MM.yyyy')
          return requestFN(`https://www.ariva.de/${slugPart}?${query}&min_time=${dateFrom}&max_time=${dateUntil}`)
        })
        .then(resp => parse(symbolFrom, symbolTo, startDate, resp.data))
        .then(courses => courses.map(course => saveFN(course)))
    }
  }
}
