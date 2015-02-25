import React from 'react';
import Fares from '../../stores/fares';
import FareActions from '../../actions/fare_actions';

let component;

export default class FareInput extends React.Component {

  constructor (props) {
    super(props);
    component = this;
    component.state = {
      remainingBalance : null,
      maxToSpend : null
    }
  }

  setMaxToSpend (event) {
    var maxToSpend = event.target.valueAsNumber;
    FareActions.updateMaxToSpend(maxToSpend);
    component.setState({maxToSpend});
  }

  setRemainingBalance (event) {
    var remainingBalance = event.target.valueAsNumber;
    FareActions.updateRemainingBalance(remainingBalance);
    component.setState({remainingBalance});
  }

  render () {
    return (
      <form name="farepurchase">
        <label htmlFor="remaining">
          <h3>Remaining balance</h3>
          <input name="remaining" ref="balanceInput" value={component.state.remainingBalance} onChange={component.setRemainingBalance} type="number" required placeholder="0.00"/>
        </label>
        <label htmlFor="max">
          <h3>Max to spend</h3>
          <input name="max" ref="maxInput" type="number" defaultValue={40} value={component.state.maxToSpend} onChange={component.setMaxToSpend} required placeholder="40.00"/>
        </label>
      </form>
    );
  }

}