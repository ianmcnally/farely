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
    Fares.addChangeListener(this.updateOptions);
  }

  updateOptions () {
    this.setState({
      purchaseOptions : Fares.getPurchaseOptions()
    });
  }

  render () {
    var options = this.state.purchaseOptions.map((option, i) =>
      <li key={i}>
        <span className="amount">{option.amount}</span> for {option.rides} rides
      </li>
    )
    return (
      <ul>
        {options}
      </ul>
    );
  }

}