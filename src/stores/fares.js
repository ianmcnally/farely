import {EventEmitter} from 'events';

const EVENTS = {
  MAX_TO_SPEND_CHANGE : 'max_to_spend_change',
  REMAINING_BALANCE_CHANGE : 'remaining_balance_change'
}

class Fares extends EventEmitter {

  setRemainingBalance(balance){
    this.remainingBalance = balance;
    this.emit(EVENTS.REMAINING_BALANCE_CHANGE);
  }

  setMaxToSpend(max){
    this.maxToSpend = max;
    this.emit(EVENTS.MAX_TO_SPEND_CHANGE);
  }

  addFareChangeListener(callback){
    this.on(EVENTS.MAX_TO_SPEND_CHANGE, callback);
    this.on(EVENTS.REMAINING_BALANCE_CHANGE, callback);
  }

  getPurchaseOptions(){
    return  [
      {
        amount : new Date().getSeconds(),
        rides : new Date().getUTCMilliseconds()
      }
    ]
  }

}

var fares = new Fares()
fares.EVENTS = EVENTS;

export default fares;
