import currencies from './defaultCurrencies'

const applyDefaultCurrencies = (stores) => {
  //initialise default currencies
  let promises = []

  for (let type in currencies) {
    for(let currencyKey in currencies[type]){
      promises.push(stores.currencies.setItem(`${type}_${currencyKey}`, {
        type: type,
        key: currencyKey,
        ...currencies[type][currencyKey]
      }))
    }
  }

  return Promise.all(promises)
}

export default [
  applyDefaultCurrencies,
  applyDefaultCurrencies, //two times because there is now crawler information inside (and there was no possibility to add currency into the store via gui!)
]
