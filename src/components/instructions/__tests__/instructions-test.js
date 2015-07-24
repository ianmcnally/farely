import React from 'react/addons';
import FareActions from '../../../actions/fare_actions';
import Instructions from '../instructions.jsx';

const {
  renderIntoDocument
} = React.addons.TestUtils;

describe('Instructions', () => {

  let component;

  beforeEach(() => {
    component = renderIntoDocument(<Instructions />);
  })

  it('defaults to showing instructions', () => {
    expect(component.state.showInstructions).toBe(true);
  });

  it('shows the instructions when there are no purchase options', () => {
    FareActions.updateFareParameters(null, null);

    expect(component.state.showInstructions).toBe(true);
    let hiddenAttribute = React.findDOMNode(component).attributes.getNamedItem('hidden');
    expect(hiddenAttribute).toBeFalsy();
  });

  it('hides instructions when there are purchase options', () => {
    FareActions.updateFareParameters('2', '40');

    expect(component.state.showInstructions).toBe(false);
    let hiddenAttribute = React.findDOMNode(component).attributes.getNamedItem('hidden');
    expect(hiddenAttribute).toBeTruthy();
    expect(hiddenAttribute.value).toEqual('true');
  });

});