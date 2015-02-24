import FARE_UPDATES from '../constants/fare_updates';
import AppDispatcher from '../dispatchers/app';

var FareActions = {

  updateRemainingBalance : (balance) => {
    AppDispatcher.dispatch({
      actionType : FARE_UPDATES.REMAINING_BALANCE_UPDATE,
      balance : balance
    });
  },

  updateMaxToSpend : (maxToSpend) => {
    AppDispatcher.dispatch({
      actionType : FARE_UPDATES.MAX_TO_SPEND_UPDATE,
      maxToSpend : maxToSpend
    });
  }

}

export default FareActions;