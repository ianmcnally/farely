import PurchaseOptions from '../purchase_options.jsx'
import Fares from '../../../stores/fares'
import FareActions from '../../../actions/fare_actions'
import {
  renderIntoDocument,
  scryRenderedDOMComponentsWithClass
} from 'react-addons-test-utils'

const {
  stub
} = sinon

describe('PurchaseOptions', () => {

  let component
  const purchaseOptions = [
    {
      amount : 10,
      rides : 100
    }, {
      amount : 20,
      rides : 200
    }
  ]

  beforeEach(() => {
    component = renderIntoDocument(<PurchaseOptions />)

    // mock state, so test doesn't rely on certain purchase options and prices
    stub(Fares, 'getState').returns({ purchaseOptions })
  })

  afterEach(() => {
    Fares.getState.restore()
  })

  it('renders an item for each purchase options', () => {
    FareActions.updateFareParameters('123', '456')

    const items = scryRenderedDOMComponentsWithClass(component, 'purchase-amount')

    expect(items).to.be.ok
    expect(items.length).to.equal(purchaseOptions.length)
  })

  it('displays the price and amount of rides for an option', () => {
    FareActions.updateFareParameters('123', '456')

    const items = scryRenderedDOMComponentsWithClass(component, 'purchase-amount')

    const text = items[0].textContent
    expect(text).to.equal(`${purchaseOptions[0].amount} for ${purchaseOptions[0].rides} rides`)
  })

})

