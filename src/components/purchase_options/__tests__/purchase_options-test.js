import React from 'react/addons';
import PurchaseOptions from '../purchase_options.jsx';
import Fares from '../../../stores/fares';
import FareActions from '../../../actions/fare_actions';

const {
  renderIntoDocument,
  scryRenderedDOMComponentsWithClass
} = React.addons.TestUtils;

const {
  stub
} = sinon;

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
    stub(Fares, 'getState').returns({purchaseOptions});
  })

  afterEach(() => {
    Fares.getState.restore();
  })

  it('renders an item for each purchase options', () => {
    FareActions.updateFareParameters('123', '456');

    let items = scryRenderedDOMComponentsWithClass(component, 'purchase-amount');

    expect(items).to.be.ok;
    expect(items.length).to.equal(purchaseOptions.length);
  });

  it('displays the price and amount of rides for an option', () => {
    FareActions.updateFareParameters('123', '456');

    let items = scryRenderedDOMComponentsWithClass(component, 'purchase-amount');
    let text = items[0].props.children.map((child) => (child.props && child.props.children) || child).join('');

    expect(text).to.equal(`${purchaseOptions[0].amount} for ${purchaseOptions[0].rides} rides`);
  });


});