const handleCmcEvent = (ctx, event) => {
  if(event.type === 'message' && event.message && event.message.d && event.message.d.p) {
    //incoming crypto currency price!
    let currencies = Object.values(ctx.rootState.currencies.currencies.crypto)
      .filter(c => c.crawler.coinmarketcap.id === event.message.d.id)

    if(currencies.length > 0) {
      let currency = currencies[0]

      ctx.commit('courses/setCourse',
        {
          from: {type: 'crypto', name: currency.key},
          to: {type: 'fiat', name: 'USD'},
          value: event.message.d.p,
        },
        { root: true }
      )

      //trigger recalculation if enabled
      if(ctx.rootState.settings.balances.realtimeRecalculation) {
        ctx.dispatch('balances/calcCurrentTotals', ctx.rootState.settings.balances.dstCurrency, { root: true })
      }
    }
  }
}

const handleFhEvent = (ctx, event) => {
  if(event.type === 'message' && event.message && event.message.content && event.message.content.price) {
    //incoming fiat currency price!
    let currencies = Object.values(ctx.rootState.currencies.currencies.fiat)
      .filter(c => c.crawler && c.crawler.finnhub && c.crawler.finnhub.symbol === event.message.content.ticker)

    if(currencies.length > 0) {
      let currency = currencies[0]

      ctx.commit('courses/setCourse',
        {
          from: {type: 'fiat', name: currency.key},
          to: {type: 'fiat', name: 'USD'},
          value: event.message.content.price,
        },
        { root: true }
      )

      //trigger recalculation if enabled
      if(ctx.rootState.settings.balances.realtimeRecalculation) {
        ctx.dispatch('balances/calcCurrentTotals', ctx.rootState.settings.balances.dstCurrency, { root: true })
      }
    }
  }
}

export const actions = {
  addEvent(ctx, event) {
    switch(event.source) {
      case 'cmc-webworker': handleCmcEvent(ctx, event.payload); break
      case 'fh-webworker': handleFhEvent(ctx, event.payload); break
    }
  }
}

export default {
  namespaced: true,
  actions
}
