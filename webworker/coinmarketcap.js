let socket = null
let watchedCurrencies = {}

const fireEvent = function (data) {
  self.postMessage({
    worker: 'cmc-webworker', //only this types will be received by our custom event handler (see plugins/webworker)
    payload: data,
  })
}

const onMessage = (event) => {
  fireEvent({type: 'message', message: JSON.parse(event.data)})
}

const subscribeCurrencies = () => {
  socket.send(JSON.stringify({
    method: "subscribe",
    id: "price",
    data: {
      cryptoIds: Object.keys(watchedCurrencies).map(k => Number.parseInt(k))
    }
  }))
}

export const watchCurrency = (currencyId) => {
  if(watchedCurrencies.hasOwnProperty(currencyId)) {
    //already watched
    return
  }

  watchedCurrencies[currencyId] = true

  if (!socket) {
    return
  }

  subscribeCurrencies()
}

export const start = () => {
  if (socket) {
    return Promise.resolve()
  } //already initialised

  // Create WebSocket connection.
  socket = new WebSocket('wss://stream.coinmarketcap.com/price/latest')

  // Listen for messages
  socket.addEventListener('message', onMessage)

  // Connection opened
  return new Promise((resolve, reject) => {
    socket.addEventListener('open', () => {
      if(Object.keys(watchedCurrencies).length > 0) {
        subscribeCurrencies()
      }

      resolve()
    })

    socket.addEventListener('error', (err) => {
      reject(err)
    })
  })
}
