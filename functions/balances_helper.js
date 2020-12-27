const addToBalance = function(balances, currency, amount){
  //skip empty amounts
  if(!amount) return

  let balance = balances.find(b =>
    b.currency.name === currency.name &&
    b.currency.type === currency.type)

  //initial balance
  if(!balance) {
    balance = {
      amount: 0,
      currency
    }
    balances.push(balance)
  }

  balance.amount += amount
}

const extractFeeBalance = function(wallet, allFees) {
  /**
   * [{
   *  amount: 123,
   *  currency: {
   *    name: "BTC",
   *    type: "crypto"
   *  },
   *  wallet: 54789,
   * }]
   */
  let balances = []
  let walletFees = allFees.filter(f => f.wallet === wallet.id)

  for(let fee of walletFees) {

    //included fee must not add explicitly
    if(!fee.included) {

      //pay attention: fees are negative amounts but will be stored as positive
      //number. So we had here negate the fee amount

      addToBalance(balances, fee.currency, fee.amount * -1)
    }
  }

  return balances
}

/**
 * expected return structure:
 * [{
 *  currency: amount
 * }[, {currencyN: amountN}]]
 *
 */
const extractBalance = {
  "exchange"(wallet, transaction) {
    let balance = extractFeeBalance(wallet, transaction.data.fee)

    if(transaction.data.in.wallet === wallet.id) {
      addToBalance(balance, transaction.data.in.currency, transaction.data.in.amount)
    }
    if(transaction.data.out.wallet === wallet.id) {
      addToBalance(balance, transaction.data.out.currency, transaction.data.out.amount * -1)
    }

    return balance;
  },
  "giftIn"(wallet, transaction) {
    let balance = extractFeeBalance(wallet, transaction.data.fee)

    if(transaction.data.in.wallet === wallet.id) {
      addToBalance(balance, transaction.data.in.currency, transaction.data.in.amount)
    }

    return balance;
  },
  "giftOut"(wallet, transaction) {
    let balance = extractFeeBalance(wallet, transaction.data.fee)

    if(transaction.data.out.wallet === wallet.id) {
      addToBalance(balance, transaction.data.out.currency, transaction.data.out.amount * -1)
    }

    return balance;
  },
  "donation"(wallet, transaction) {
    let balance = extractFeeBalance(wallet, transaction.data.fee)

    if(transaction.data.out.wallet === wallet.id) {
      addToBalance(balance, transaction.data.out.currency, transaction.data.out.amount * -1)
    }

    return balance;
  },
  "income"(wallet, transaction) {
    let balance = extractFeeBalance(wallet, transaction.data.fee)

    if(transaction.data.in.wallet === wallet.id) {
      addToBalance(balance, transaction.data.in.currency, transaction.data.in.amount)
    }

    return balance;
  },
  "lost"(wallet, transaction) {
    let balance = []

    addToBalance(balance, transaction.data.out.currency, transaction.data.out.amount * -1)

    return balance;
  },
  "spent"(wallet, transaction) {
    let balance = extractFeeBalance(wallet, transaction.data.fee)

    if(transaction.data.out.wallet === wallet.id) {
      addToBalance(balance, transaction.data.out.currency, transaction.data.out.amount * -1)
    }

    return balance;
  },
  "stolen"(wallet, transaction) {
    let balance = []

    addToBalance(balance, transaction.data.out.currency, transaction.data.out.amount * -1)

    return balance;
  },
  "transfer"(wallet, transaction) {
    let balance = extractFeeBalance(wallet, transaction.data.fee)

    if(transaction.data.in.wallet === wallet.id){
      addToBalance(balance, transaction.data.currency, transaction.data.amount)
    }else if(transaction.data.out.wallet === wallet.id){
      addToBalance(balance, transaction.data.currency, transaction.data.amount * -1)
    }

    return balance;
  }
}


const calculateBalances = function(wallet, transactions) {
  let balances = []
  for(let tx of transactions) {
    if(extractBalance[tx.type]) {
      let balance = extractBalance[tx.type](wallet, tx)

      for(let cb of balance) {
        addToBalance(balances, cb.currency, cb.amount)
      }

    }else{
      console.log("[ERROR] Unknown transaction type: " + tx.type)
    }
  }
  return balances;
}

export {
  calculateBalances, addToBalance
}
