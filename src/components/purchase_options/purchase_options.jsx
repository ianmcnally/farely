import React from 'react';
import Fares from '../../stores/fares';

export default class PurchaseOptions extends React.Component {

  constructor (props) {
    super(props);

    this.state = {
      purchaseOptions : []
    };
  }

  componentWillMount () {
    Fares.subscribe(this.updateOptions.bind(this));
  }

  updateOptions () {
    const { purchaseOptions } = Fares.getState();

    this.setState({
      purchaseOptions : purchaseOptions
    });
  }

  render () {
    return (
      <ul className="purchase-amounts">
        {this._renderOptions()}
      </ul>
    );
  }

  _renderOptions () {
      return this.state.purchaseOptions.map((option, i) =>

      <li key={i} className="purchase-amount">
        <span className="amount">{option.amount}</span> for {option.rides} rides
      </li>

    )
  }

}