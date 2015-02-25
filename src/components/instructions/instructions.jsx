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
        To be or not to be.
      </p>
    );
  }

}