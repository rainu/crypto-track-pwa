import * as dateFN from 'date-fns'
import {addToBalance, calculateBalances} from './balances_helper'

const DEFAULT_MAX_DEPTH = Number.MAX_VALUE

/**
 *
 * @param tradingPairs a list of trading pairs:
 * [{
 *  "from": {
 *    "name": "BTC",
 *    "type": "crypto"
 *  },
 *  "to": {
 *    "name": "EUR",
 *    "type": "fiat"
 *  }
 * }]
 * @param source the source currency
 * {
 *   "name": "BTC",
 *   "type": "crypto"
 * }
 * @param destination the destination currency
 * {
 *   "name": "EUR",
 *   "type": "fiat"
 * }
 * @param maxDepth the maximal depth to go in
 * @param currentDepth the current depth (only for recursive purposes)
 *
 * @return Array with a array of list of nodes (trading pairs)
 * [
 *  [{
 *    "from": {
 *      "name": "BTC",
 *      "type": "crypto"
 *    },
 *    "to": {
 *      "name": "EUR",
 *      "type": "fiat"
 *    }
 *   }]
 * ]
 */
const find = function(tradingPairs, source, destination, maxDepth = DEFAULT_MAX_DEPTH, currentDepth = 0){
  let result = []

  if(currentDepth >= maxDepth) {
    return result;
  }

  let possible = tradingPairs.filter(tp => {
    if(tp.from.name === source.name && tp.from.type === source.type) {
      if(tp.to.name === destination.name && tp.to.type === destination.type) {
        return true;
      }
    }

    return false;
  })

  if(possible.length !== 0) {
    result.push(...possible.map(tp => [tp]));
  }

  //try to route
  let possibleStarts = tradingPairs.filter(tp => {
    if(tp.from.name === source.name && tp.from.type === source.type) {
      return true;
    }

    return false;
  })

  //go through all possible starts
  //and try to find the target
  for(let start of possibleStarts) {
    let tmpSrc = start.to
    let purgedPairs = tradingPairs.filter(tp => {
      if(tp.to.name === tmpSrc.name && tp.to.type === tmpSrc.type) {
        return false;
      }

      return true;
    })

    //recursion ahead!
    let paths = find(purgedPairs, tmpSrc, destination, maxDepth, currentDepth + 1)

    for(let curPath of paths) {
      result.push([start, ...curPath])
    }
  }

  //sort by path length
  return result.sort((pathA, pathB) => {
    if(pathA.length > pathB.length) {
      return 1
    }
    if(pathA.length < pathB.length) {
      return -1
    }
    return 0
  })
}

const extractBalances = (transactions) => {
  return new Promise((resolve, reject) => {
    let walletIds = {}

    for(let tx of transactions) {
      for(let wallet of tx.involvedWallets){
        walletIds[wallet] = true
      }
    }
    walletIds = Object.keys(walletIds)

    let balances = []
    for(let walletId of walletIds) {
      let wallet = {
        id: walletId
      }

      for(let curBalance of calculateBalances(wallet, transactions)) {
        addToBalance(balances, curBalance.currency, curBalance.amount)
      }
    }

    resolve(balances)
  })
}

const isSameOrBefore = (a, b) => {
  let aDay = dateFN.startOfDay(a)
  let bDay = dateFN.startOfDay(b)
  return dateFN.isSameDay(aDay, bDay) || dateFN.isBefore(aDay, bDay)
}

export const newBalanceCalculator = ($saveBalancesAt) => {
  return {
    calcHistoricalBalances(transactions, from, until, progressFN = () => {}){
      transactions.sort((a, b) => (new Date(a.date) - new Date(b.date)))
      from = dateFN.startOfDay(from)
      until = dateFN.startOfDay(until)

      const total = Math.abs(dateFN.differenceInDays(from, until))
      let i=0

      let p = []
      for (let curDate = from; isSameOrBefore(curDate, until); curDate = dateFN.addDays(curDate, 1)) {
        let filteredTransactions = []
        for (let tx of transactions) {
          if (isSameOrBefore(dateFN.parseISO(tx.date), curDate)) {
            filteredTransactions.push(tx);
          } else {
            //transactions are ordered by date
            break;
          }
        }

        const _curDate = curDate
        const curIter = i++
        let promise = extractBalances(filteredTransactions)
          .then(balances => $saveBalancesAt(balances, _curDate).then(() => balances))
          .then(() => progressFN(curIter, total))

        p.push(promise)
      }

      return Promise.all(p)
    }
  }
}

export const newTotalsCalculator = ($getHistoricalCourse, $getHistoricalBalances, $saveTotalAmountAt) => {
  const _calcHistoricalBalance = (pairs, amount, srcCurrency, dstCurrency, date) => {
    const paths = find(pairs, srcCurrency, dstCurrency)

    if(!paths || paths.length <= 0) {
      //no path found!
      return Promise.resolve(-1);
    }

    const shortestPath = paths[0]; //the shortest path
    let ratioPromises = []

    //enrich path with ratios
    for(let i in shortestPath) {
      const hop = shortestPath[i]
      ratioPromises.push($getHistoricalCourse(hop.from, hop.to, date));
    }

    return Promise.all(ratioPromises)
      .then((courses) => {
        let result = amount
        for(let course of courses) {
          result *= (course ? course.close : 0)
        }
        return result
      })
  }

  const _calcTotalBalanceAt = (balances, pairs, date, dstCurrency) => {
    let amounts = {total: 0}
    let allPromises = []
    for(let balance of balances) {
      let currency = balance.currency
      if(currency.type !== dstCurrency.type || currency.name !== dstCurrency.name) {
        let p = _calcHistoricalBalance(pairs, balance.amount, currency, dstCurrency, date)
          .then(curAmount => {
            if(!amounts[currency.type]) {
              amounts[currency.type] = {}
            }

            amounts[currency.type][currency.name] = curAmount
            amounts.total += curAmount
          })
        allPromises.push(p)
      }
    }

    return Promise.all(allPromises)
      .then(() => {
        return amounts
      })
  }

  return {
    calcHistoricalTotals(pairs, dstCurrency, from, until, progressFN = () => {}){
      from = dateFN.startOfDay(from)
      until = dateFN.startOfDay(until)

      const total = Math.abs(dateFN.differenceInDays(from, until))
      let i=0

      let p = []
      for (let curDate = from; isSameOrBefore(curDate, until); curDate = dateFN.addDays(curDate, 1)) {
        const _curDate = curDate
        const curIter = i++

        let promise = $getHistoricalBalances(_curDate)
          .then(balances => _calcTotalBalanceAt(balances, pairs, _curDate, dstCurrency))
          .then(amount => $saveTotalAmountAt(amount, dstCurrency, _curDate))
          .then(() => progressFN(curIter, total))

        p.push(promise)
      }

      return Promise.all(p)
    }
  }
}
