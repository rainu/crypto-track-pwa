const currencyId = function(currency) {
  return `${currency.type}_${currency.name}`
}

const uniq = function(currencies) {
  let uniq = []
  const alreadyKnown = new Set();

  for(let currency of currencies) {
    //skip empty currencies
    if(!currency) continue;
    if(!currency.name) continue;
    if(!currency.type) continue;

    let id = currencyId(currency);

    if(!alreadyKnown.has(id)){
      uniq.push(currency);
      alreadyKnown.add(id);
    }
  }

  return uniq
}

export {
  uniq
}
