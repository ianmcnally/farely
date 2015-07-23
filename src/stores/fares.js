import { createStore } from 'redux';
import { FARE_PARAMETER } from '../constants/fare_updates';
import fareService from '../services/fare';

export default createStore((state = {}, action) => {

  if (action.type === FARE_PARAMETER) {
    let {remainingBalance, maxToSpend} = action;

    remainingBalance = remainingBalance ? Number(remainingBalance) : null;
    maxToSpend = maxToSpend ? Number(maxToSpend) : null;

    state = {
      maxToSpend,
      remainingBalance,
      purchaseOptions: fareService.amountsToAdd(remainingBalance, maxToSpend)
    }
  }

  return state;

});
