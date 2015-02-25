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
    let remainingBalance = component.refs.balanceInput.getDOMNode().value;
    let maxToSpend = component.refs.maxInput.getDOMNode().value;
    FareActions.updateFareParameters(remainingBalance, maxToSpend);
    component.setState({remainingBalance, maxToSpend});
  }

  render () {
    return (
      <form name="farepurchase">
        <label htmlFor="remaining">
          <h3>Remaining balance</h3>
          <input name="remaining" ref="balanceInput" type="number" value={component.state.remainingBalance} onChange={component.setFareParameters} required placeholder="0.00" autofocus/>
        </label>
        <label htmlFor="max">
          <h3>Max to spend</h3>
          <input name="max" ref="maxInput" type="number" value={component.state.maxToSpend} onChange={component.setFareParameters} required placeholder="40.00"/>
        </label>
      </form>
    );
  }

}