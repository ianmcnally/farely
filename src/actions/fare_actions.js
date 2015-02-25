import FARE_UPDATES from '../constants/fare_updates';
import AppDispatcher from '../dispatchers/app';

var FareActions = {

  updateFareParameters : (balance, maxToSpend) => {
    AppDispatcher.dispatch({
      actionType : FARE_UPDATES.FARE_PARAMETER,
      balance : balance,
      maxToSpend : maxToSpend
    });
  },

}

export default FareActions;