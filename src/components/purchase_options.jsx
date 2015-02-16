import React from 'react';
import Fares from '../stores/fares';

export default React.createClass({

  getInitialState(){
    return {
      purchaseOptions : []
    };
  },

  componentWillMount(){
    Fares.addFareChangeListener(this.updateOptions);
  },

  updateOptions(){
    this.setState({
      purchaseOptions : Fares.getPurchaseOptions()
    });
  },

  render(){
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
});