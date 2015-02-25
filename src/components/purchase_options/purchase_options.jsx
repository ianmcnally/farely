import React from 'react';
import Fares from '../../stores/fares';

let component;

export default class PurchaseOptions extends React.Component {

  constructor (props) {
    super(props);
    component = this;
    component.state = {
      purchaseOptions : []
    };
  }

  componentWillMount () {
    Fares.addChangeListener(component.updateOptions);
  }

  updateOptions () {
    component.setState({
      purchaseOptions : Fares.purchaseOptions
    });
  }

  render () {
    return (
      <ul className="purchase-amounts">
        {component._renderOptions()}
      </ul>
    );
  }

  _renderOptions () {
      return component.state.purchaseOptions.map((option, i) =>

      <li key={i} className="purchase-amount">
        <span className="amount">{option.amount}</span> for {option.rides} rides
      </li>

    )
  }

}