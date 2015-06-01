import React from 'react';
import FareActions from '../../actions/fare_actions';
import CurrencyMaskedInput from 'react-currency-masked-input';

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
    let remainingBalance = React.findDOMNode(component.refs.balanceInput).value;
    let maxToSpend = React.findDOMNode(component.refs.maxInput).value;
    FareActions.updateFareParameters(remainingBalance, maxToSpend);
    component.setState({remainingBalance, maxToSpend});
  }

  render () {
    return (
      <form name="farepurchase">
        <section>
          <h3>Remaining balance</h3>
          <label htmlFor="remaining">$</label>
          <CurrencyMaskedInput name="remaining" pattern="\d*" ref="balanceInput" type="number" onChange={component.setFareParameters} required placeholder="0.00" autofocus/>
        </section>
        <section>
          <h3>Max to spend</h3>
          <label htmlFor="max">$</label>
          <CurrencyMaskedInput name="max" pattern="\d*" ref="maxInput" type="number" value={component.state.maxToSpend} onChange={component.setFareParameters} required placeholder="0.00"/>
        </section>
      </form>
    );
  }

}