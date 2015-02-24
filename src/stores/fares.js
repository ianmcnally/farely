import {EventEmitter} from 'events';
import AppDispatcher from '../dispatchers/app';
import FARE_UPDATES from '../constants/fare_updates';

const EVENTS = {
  CHANGE : 'change'
}

class Fares extends EventEmitter {

  emitChange () {
    this.emit(EVENTS.CHANGE);
  }

  setRemainingBalance (balance) {
    this.remainingBalance = balance;
    this.emitChange();
  }

  setMaxToSpend (max) {
    this.maxToSpend = max;
    this.emitChange();
  }

  addChangeListener (callback) {
    this.on(EVENTS.CHANGE, callback);
  }

  getPurchaseOptions (remainingBalance, maxToSpend) {
    return  [
      {
        amount : new Date().getSeconds(),
        rides : new Date().getUTCMilliseconds()
      }
    ]
  }

}

var fares = new Fares();

AppDispatcher.register( (action) => {

  switch (action.actionType) {

    case FARE_UPDATES.REMAINING_BALANCE_UPDATE:
      fares.setRemainingBalance(action.balance);
      break;

    case FARE_UPDATES.MAX_TO_SPEND_UPDATE:
      fares.setMaxToSpend(action.maxToSpend);
      break;

    default:

  }

});

export default fares;