import { createStore } from 'redux'
import { FARE_PARAMETER } from '../constants/fare_updates'
import fareService from '../services/fare'

const initialState = {
  maxToSpend : 40.00,
  remainingBalance : null,
  purchaseOptions : []
}

export default createStore((state = initialState, action) => {

  if (action.type === FARE_PARAMETER) {
    let { remainingBalance, maxToSpend } = action

    remainingBalance = remainingBalance ? Number(remainingBalance) : null
    maxToSpend = maxToSpend ? Number(maxToSpend) : null

    return {
      maxToSpend,
      remainingBalance,
      purchaseOptions : fareService.amountsToAdd(remainingBalance, maxToSpend)
    }
  }

  return state

})
