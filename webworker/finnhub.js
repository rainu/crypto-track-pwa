let socket = null
let watchedCurrencies = {}

const fireEvent = function (data) {
  self.postMessage({
    worker: 'fh-webworker', //only this types will be received by our custom event handler (see plugins/webworker)
    payload: data,
  })
}

const onMessage = (event) => {
  fireEvent({type: 'message', message: JSON.parse(event.data)})
}

const subscribeCurrencies = () => {
  for (let symbol of Object.keys(watchedCurrencies)) {
    socket.send(JSON.stringify({
      type: 50,
      ticker: symbol
    }))
  }
}

export const watchCurrency = (symbol) => {
  if(watchedCurrencies.hasOwnProperty(symbol)) {
    //already watched
    return
  }

  watchedCurrencies[symbol] = true

  if (!socket) {
    return
  }

  subscribeCurrencies()
}

export const start = () => {
  if (socket) return Promise.resolve() //already initialised

  // Create WebSocket connection.
  socket = new WebSocket('wss://finnhub.io/ws')

  // Listen for messages
  socket.addEventListener('message', onMessage)

  // Connection opened
  return new Promise((resolve, reject) => {
    socket.addEventListener('open', () => {
      if (Object.keys(watchedCurrencies).length > 0) {
        subscribeCurrencies()
      }

      resolve()
    })

    socket.addEventListener('error', (err) => {
      reject(err)
    })
  })
}
