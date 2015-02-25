import React from 'react';
import FareActions from '../../actions/fare_actions';

let component;

export default class FareInput extends React.Component {

  constructor (props) {
    super(props);
    component = this;
    component.state = {
      remainingBalance : null,
      maxToSpend : 40
    }
  }

  setFareParameters () {
    let remainingBalance = component.refs.balanceInput.getDOMNode().valueAsNumber;
    let maxToSpend = component.refs.maxInput.getDOMNode().valueAsNumber;
    FareActions.updateFareParameters(remainingBalance, maxToSpend);
    component.setState({remainingBalance, maxToSpend});
  }

  render () {
    return (
      <form name="farepurchase">
        <label htmlFor="remaining">
          <h3>Remaining balance</h3>
          <input name="remaining" ref="balanceInput" value={component.state.remainingBalance} onChange={component.setFareParameters} type="number" required placeholder="0.00"/>
        </label>
        <label htmlFor="max">
          <h3>Max to spend</h3>
          <input name="max" ref="maxInput" type="number" value={component.state.maxToSpend} onChange={component.setFareParameters} required placeholder="40.00"/>
        </label>
      </form>
    );
  }

}