import {EventEmitter} from 'events';
import AppDispatcher from '../dispatchers/app';
import FARE_UPDATES from '../constants/fare_updates';
import fareService from '../services/fare';

const EVENTS = {
  CHANGE : 'change'
}

let purchaseOptions = [];

class Fares extends EventEmitter {

  constructor () {
    this.addChangeListener(this._setOptions);
  }

  emitChange () {
    this.emit(EVENTS.CHANGE);
  }

  setFareParameters (balance, max) {
    this.remainingBalance = balance ? Number(balance) : null;
    this.maxToSpend = max ? Number(max) : null;
    this.emitChange();
  }

  addChangeListener (callback) {
    this.on(EVENTS.CHANGE, callback);
  }

  get purchaseOptions () {
    return purchaseOptions;
  }

  _setOptions () {
    purchaseOptions = fareService.amountsToAdd(this.remainingBalance, this.maxToSpend);
  }

}

var fares = new Fares();

AppDispatcher.register( (action) => {

  switch (action.actionType) {

    case FARE_UPDATES.FARE_PARAMETER:
      fares.setFareParameters(action.balance, action.maxToSpend);
      break;

    default:

  }

});

export default fares;