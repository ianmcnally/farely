import RATES from '../constants/rates'

Math.trunc || (Math.trunc = (value) => {
  return (value < 0) ? Math.ceil(value) : Math.floor(value)
})

const createFareMultiples = (max) => {
  const maxToSpend = (max > RATES.TRANSACTION_MAX) ? RATES.TRANSACTION_MAX : max
  let fareMultiple = 0
  const fares = []
  while (fareMultiple <= maxToSpend) {
    fareMultiple += RATES.RIDE_COST
    fares.push(fareMultiple)
  }
  return fares
}

// get change as a while number i.e., 0.25 -> 25
const getChange = (cost) => {
  return parseInt((cost - Math.trunc(cost)).toFixed(2) * 100)
}

const isValidAmount = (amountToAdd) => {
  return !(getChange(amountToAdd) % 5) && (amountToAdd > 0)
}

const amountToAdd = (fare, balanceLeft) => {
  const amount = fare - balanceLeft
  const bonus = RATES.BONUS_PERCENT * 0.01 + 1
  const amountWithBonus = amount / bonus

  // doesn't return amount-bonus (how much to pay) if amount-bonus is < min bonus amount
  const toAdd = (amountWithBonus < RATES.BONUS_MIN) ? amount : amountWithBonus

  return toAdd.toFixed(2)
}

export default {
  amountsToAdd : (balanceLeft, maxToSpend) => {
    if (balanceLeft === null || maxToSpend === null) { return [] }
    const purchases = []
    const fares = createFareMultiples(maxToSpend)
    for (let i = fares.length - 1; i >= 0; i--) {
      const toAdd = amountToAdd(fares[i], balanceLeft)
      if (isValidAmount(toAdd)) {
        purchases.push({
          amount : toAdd,
          rides : fares[i] / RATES.RIDE_COST
        })
      }
    }
    return purchases
  }
}
