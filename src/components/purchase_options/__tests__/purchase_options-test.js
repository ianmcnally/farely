import React from 'react/addons';
import PurchaseOptions from '../purchase_options.jsx';
import Fares from '../../../stores/fares';
import FareActions from '../../../actions/fare_actions';

const {
  renderIntoDocument,
  scryRenderedDOMComponentsWithClass
} = React.addons.TestUtils;

describe('PurchaseOptions', () => {

  let component;
  let purchaseOptions = [
    {
      amount: 10,
      rides: 100
    }, {
      amount: 20,
      rides: 200
    }
  ];

  beforeEach(() => {
    component = renderIntoDocument(<PurchaseOptions />);

    // mock state, so test doesn't rely on certain purchase options and prices
    spyOn(Fares, 'getState').and.returnValue({purchaseOptions});
  });

  it('renders an item for each purchase options', () => {
    FareActions.updateFareParameters('123', '456');

    let items = scryRenderedDOMComponentsWithClass(component, 'purchase-amount');

    expect(items).toBeTruthy();
    expect(items.length).toEqual(purchaseOptions.length);
  });

  it('displays the price and amount of rides for an option', () => {
    FareActions.updateFareParameters('123', '456');

    let items = scryRenderedDOMComponentsWithClass(component, 'purchase-amount');
    let text = items[0].props.children.map((child) => (child.props && child.props.children) || child).join('');

    expect(text).toEqual(`${purchaseOptions[0].amount} for ${purchaseOptions[0].rides} rides`);
  });


});