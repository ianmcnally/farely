import React from 'react';
import Fares from '../../stores/fares';
import FareActions from '../../actions/fare_actions';

export default React.createClass({

  getInitialState () {
    return {
      remainingBalance : null,
      maxToSpend : null
    }
  },

  setMaxToSpend (event) {
    var maxToSpend = event.target.valueAsNumber;
    FareActions.updateMaxToSpend(maxToSpend);
    this.setState({maxToSpend});
  },

  setRemainingBalance (event) {
    var remainingBalance = event.target.valueAsNumber;
    FareActions.updateRemainingBalance(remainingBalance);
    this.setState({remainingBalance});
  },

  render () {
    return (
      <form name="farepurchase">
        <label htmlFor="remaining">
          <h3>Remaining balance</h3>
          <input name="remaining" ref="balanceInput" value={this.state.remainingBalance} onChange={this.setRemainingBalance} type="number" required placeholder="0.00"/>
        </label>
        <label htmlFor="max">
          <h3>Max to spend</h3>
          <input name="max" type="number" defaultValue={40} value={this.state.maxToSpend} onChange={this.setMaxToSpend} required placeholder="40.00"/>
        </label>
      </form>
    );
  }
});