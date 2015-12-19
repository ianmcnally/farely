import React, { Component } from 'react'
import { PurchaseOptions, mapStateToProps } from '../purchase_options.jsx'
import { renderIntoDocument, scryRenderedDOMComponentsWithClass } from 'react-addons-test-utils'

describe('PurchaseOptions', () => {
  let items
  const purchaseOptions = [
    {
      amount : 10,
      rides : 100
    }, {
      amount : 20,
      rides : 200
    }
  ]
  const props = mapStateToProps({ purchaseOptions })

  class Wrapper extends Component {
    render () {
      return <PurchaseOptions {...this.props} />
    }
  }

  before(() => {
    const wrapper = renderIntoDocument(<Wrapper {...props} />)
    items = scryRenderedDOMComponentsWithClass(wrapper, 'purchase-amount')
  })

  it('renders an item for each purchase options', () => {
    expect(items).to.be.ok
    expect(items.length).to.equal(purchaseOptions.length)
  })

  it('displays the price and amount of rides for an option', () => {
    const text = items[0].textContent
    expect(text).to.equal(`${purchaseOptions[0].amount} for ${purchaseOptions[0].rides} rides`)
  })

})

