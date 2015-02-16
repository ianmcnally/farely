import React from 'react';
import Fares from '../stores/fares';

export default React.createClass({

  defaultMaxToSpend : 40.00,

  setMaxToSpend(event){
    Fares.setMaxToSpend(event.target.valueAsNumber);
  },

  setRemainingBalance(event){
    Fares.setRemainingBalance(event.target.valueAsNumber);
  },

  render(){
    return (
      <form name="farepurchase">
        <label htmlFor="remaining">
          <h3>Remaining balance</h3>
          <input name="remaining" value={Fares.remainingBalance} onChange={this.setRemainingBalance} type="number" required placeholder="0.00"/>
        </label>
        <label htmlFor="max">
          <h3>Max to spend</h3>
          <input name="max" type="number" defaultValue={this.defaultMaxToSpend} value={Fares.maxToSpend} onChange={this.setMaxToSpend} required placeholder="40.00"/>
        </label>
      </form>
    );
  }
});