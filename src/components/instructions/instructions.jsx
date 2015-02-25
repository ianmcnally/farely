import React from 'react';
import Fares from '../../stores/fares';

let component;

export default class Instructions extends React.Component {

  constructor (props) {
    super(props);
    component = this;
    component.state = {
      showInstructions : true
    };
  }

  componentWillMount () {
    Fares.addChangeListener(component.updateInstructions);
  }

  updateInstructions () {
    component.setState({
      showInstructions : !Fares.purchaseOptions.length
    });
  }

  render(){
    return (
      <p hidden={!component.state.showInstructions}>
        Enter your MetroCard's remaining balance to calculate the exact amount to put on it. No nickels and dimes wasted.
      </p>
    );
  }

}