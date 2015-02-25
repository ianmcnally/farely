import RATES from '../constants/rates';

Math.trunc || (Math.trunc = (value) => {
  return (value < 0) ? Math.ceil(value) : Math.floor(value);
});

var createFareMultiples = (max) => {
  max = (max > RATES.TRANSACTION_MAX) ? RATES.TRANSACTION_MAX : max;
  let fareMultiple = 0;
  let fares = [];
  while (fareMultiple <= max) {
    fareMultiple += RATES.RIDE_COST;
    fares.push(fareMultiple);
  }
  return fares;
}

// get change as a while number i.e., 0.25 -> 25
var getChange = (cost) => {
  return parseInt((cost - Math.trunc(cost)).toFixed(2) * 100);
}

var isValidAmount = (amountToAdd) => {
  return !(getChange(amountToAdd) % 5) && (amountToAdd > 0);
}

var amountToAdd = (fare, balanceLeft) => {
  let amount = fare - balanceLeft;
  let bonus = ((amount < RATES.BONUS_MIN) ? 0 : RATES.BONUS_PERCENT / 100) + 1.0;
  return (amount / bonus).toFixed(2);
}

export default {
  amountsToAdd : (balanceLeft, maxToSpend) => {
    if (balanceLeft === null || maxToSpend === null) return [];
    let purchases = [];
    let fares = createFareMultiples(maxToSpend);
    for (let i = fares.length - 1; i >= 0; i--) {
      let toAdd = amountToAdd(fares[i], balanceLeft);
      if (isValidAmount(toAdd)) {
        purchases.push({
          amount : toAdd,
          rides : fares[i] / RATES.RIDE_COST
        })
      }
    }
    return purchases;
  }
}