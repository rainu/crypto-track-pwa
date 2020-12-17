import currencies from './defaultCurrencies'

export default [
  (stores) => new Promise((resolve, reject) => {
    //initialise default currencies
    for (let type in currencies) {
      for(let currencyKey in currencies[type]){
        stores.currencies.setItem(`${type}_${currencyKey}`, {
          type: type,
          key: currencyKey,
          ...currencies[type][currencyKey]
        })
      }
    }

    resolve()
  }),
]
