import json2csv from 'json2csv'
import moment from 'moment'

//"Type", "Buy Amount", "Buy Currency", "Sell Amount", "Sell Currency", "Fee", "Fee Currency", "Exchange", "Trade-Group", "Comment", "Date", "Tx-ID", "Buy Value in your Account Currency", "Sell Value in your Account Currency"
const fields = [
  {label: 'Type', value: 'type'},
  {label: 'Buy Amount', value: 'buy.value'},
  {label: 'Buy Currency.', value: 'buy.currency'},
  {label: 'Sell Amount', value: 'sell.value'},
  {label: 'Sell Currency', value: 'sell.currency'},
  {label: 'Fee', value: 'fee.value'},
  {label: 'Fee Currency', value: 'fee.currency'},
  {label: 'Exchange', value: 'exchange'},
  {label: 'Trade-Group', value: 'trade.group'},
  {label: 'Comment', value: 'comment'},
  {label: 'Date', value: 'date'},
  {label: 'Tx-ID', value: 'trade.id'},
  {label: 'Buy Value in your Account Currency', value: 'counter.buy'},
  {label: 'Sell Value in your Account Currency', value: 'counter.sell'}
];

let extractFee = (tx) => {
  let result = {
    value: null,
    currency: null,
  }

  if(tx.data && tx.data.fee && tx.data.fee.length > 0) {
    result.value = tx.data.fee[0].amount
    result.currency = tx.data.fee[0].currency.name
  }

  return result
}

let findExchangeRate = (tx, currency) => {
  if(tx.data && tx.data.exchangeRates && tx.data.exchangeRates.length > 0) {
    for(let curRate of tx.data.exchangeRates){
      if(curRate.in.name === currency.name && curRate.in.type === currency.type){
        return curRate
      }
    }
  }

  return null
}

let extractCounterValue = (tx) => {
  let result = {
    buy: null,
    sell: null
  }

  if(tx.data && tx.data.exchangeRates && tx.data.exchangeRates.length > 0) {
    //there are exchangeRates

    if(tx.data && tx.data.out && tx.data.out.currency && tx.data.out.currency.type === 'crypto') {
      //try to find sell counter value
      let rate = findExchangeRate(tx, tx.data.out.currency)
      if(rate) {
        result.sell = tx.data.out.amount * rate.ratio
      }
    }

    if(tx.data && tx.data.in && tx.data.in.currency && tx.data.in.currency.type === 'crypto') {
      //try to find buy counter value
      let rate = findExchangeRate(tx, tx.data.in.currency)
      if(rate) {
        result.buy = tx.data.in.amount * rate.ratio
      }
    }

  }

  return result
}

let handleMap = {
  'exchange': (tx) => {
    return [{
      type: 'Trade',
      buy: {
        value: tx.data.in.amount,
        currency: tx.data.in.currency.name,
      },
      sell: {
        value: tx.data.out.amount,
        currency: tx.data.out.currency.name,
      },
      fee: extractFee(tx),
      exchange: tx.data.details.exchange,
      trade: {
        id: tx.data.details.comment,
        group: tx.data.details.group,
      },
      counter: extractCounterValue(tx),
      comment: tx.data.details.comment,
      date: moment(tx.date).format('YYYY-MM-DD HH:mm')
    }]
  },
  'transfer': (tx) => {
    return [{
      type: 'Withdrawal',
      sell: {
        value: tx.data.amount,
        currency: tx.data.currency.name,
      },
      fee: extractFee(tx),
      exchange: tx.data.details.exchange,
      trade: {
        id: tx.data.details.comment,
        group: tx.data.details.group,
      },
      comment: tx.data.details.comment,
      date: moment(tx.date).format('YYYY-MM-DD HH:mm')
    },{
      type: 'Deposit',
      buy: {
        value: tx.data.amount,
        currency: tx.data.currency.name,
      },
      exchange: tx.data.details.exchange,
      trade: {
        id: tx.data.details.comment,
        group: tx.data.details.group,
      },
      comment: tx.data.details.comment,
      date: moment(tx.date).format('YYYY-MM-DD HH:mm')
    }]
  },
  'spent': (tx) => {
    return [{
      type: 'Spend',
      sell: {
        value: tx.data.out.amount,
        currency: tx.data.out.currency.name,
      },
      fee: extractFee(tx),
      exchange: tx.data.details.exchange,
      trade: {
        id: tx.data.details.comment,
        group: tx.data.details.group,
      },
      counter: extractCounterValue(tx),
      comment: tx.data.details.comment,
      date: moment(tx.date).format('YYYY-MM-DD HH:mm')
    }]
  },
  'giftIn': (tx) => {
    return [{
      type: 'Gift/Tip',
      buy: {
        value: tx.data.in.amount,
        currency: tx.data.in.currency.name,
      },
      fee: extractFee(tx),
      exchange: tx.data.details.exchange,
      trade: {
        id: tx.data.details.comment,
        group: tx.data.details.group,
      },
      counter: extractCounterValue(tx),
      comment: tx.data.details.comment,
      date: moment(tx.date).format('YYYY-MM-DD HH:mm')
    }]
  },
  'giftOut': (tx) => {
    return [{
      type: 'Gift',
      sell: {
        value: tx.data.out.amount,
        currency: tx.data.out.currency.name,
      },
      fee: extractFee(tx),
      exchange: tx.data.details.exchange,
      trade: {
        id: tx.data.details.comment,
        group: tx.data.details.group,
      },
      counter: extractCounterValue(tx),
      comment: tx.data.details.comment,
      date: moment(tx.date).format('YYYY-MM-DD HH:mm')
    }]
  },
  'lost': (tx) => {
    return [{
      type: 'Lost',
      sell: {
        value: tx.data.out.amount,
        currency: tx.data.out.currency.name,
      },
      fee: extractFee(tx),
      exchange: tx.data.details.exchange,
      trade: {
        id: tx.data.details.comment,
        group: tx.data.details.group,
      },
      counter: extractCounterValue(tx),
      comment: tx.data.details.comment,
      date: moment(tx.date).format('YYYY-MM-DD HH:mm')
    }]
  },
  'stolen': (tx) => this.lost(tx)
}

export const exportCointracking = (transactions) => {
  return new Promise((resolve, reject) => {
    const opts = {fields};

    let csvData = []
    for (let tx of Object.values(transactions)) {
      if(handleMap[tx.type]) {
        csvData.push(...handleMap[tx.type](tx))
      }else{
        reject(`Transaction not supported yet: ${tx.type}`)
        return
      }
    }

    resolve(json2csv.parse(csvData, opts))
  })
}
