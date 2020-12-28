import Vue from 'vue'
import CMCWorker from 'workerize-loader!../webworker/coinmarketcap'
import FHWorker from 'workerize-loader!../webworker/finnhub'

const cmcWorker = new CMCWorker
const fhWorker = new FHWorker

const $webworker = {
  cmcWorker,
  fhWorker
}

Vue.prototype.$webworker = $webworker

export default function ({app, store}, inject) {
  app.$webworker = $webworker
  store.$webworker = $webworker

  $webworker.cmcWorker.onmessage = (event) => {
    if(event && event.data && event.data.worker && event.data.worker === 'cmc-webworker') {
      store.dispatch('webworker/addEvent', {source: event.data.worker, payload: event.data.payload})
    }
  }

  $webworker.fhWorker.onmessage = (event) => {
    if(event && event.data && event.data.worker && event.data.worker === 'fh-webworker') {
      store.dispatch('webworker/addEvent', {source: event.data.worker, payload: event.data.payload})
    }
  }
}
