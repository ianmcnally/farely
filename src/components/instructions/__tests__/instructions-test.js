import React, { Component } from 'react'
import { Instructions, mapStateToProps } from '../instructions.jsx'
import {
  findRenderedDOMComponentWithClass,
  renderIntoDocument
} from 'react-addons-test-utils'

describe('Instructions', () => {

  class Wrapper extends Component {
    render () {
      return <Instructions {...this.props}/>
    }
  }

  context('defaults', () => {
    let component
    let isHidden
    const props = mapStateToProps({ purchaseOptions : [] })

    before(() => {
      const wrapper = renderIntoDocument(<Wrapper {...props}/>)
      component = findRenderedDOMComponentWithClass(wrapper, 'instructions')
      isHidden = component.attributes.getNamedItem('hidden') !== null
    })

    it('defaults to showing instructions', () => {
      expect(isHidden).to.be.false
    })

  })

  context('no purchase options', () => {
    let component
    let isHidden
    const props = mapStateToProps({ purchaseOptions : [] })

    beforeEach(() => {
      const wrapper = renderIntoDocument(<Wrapper {...props}/>)
      component = findRenderedDOMComponentWithClass(wrapper, 'instructions')

      isHidden = component.attributes.getNamedItem('hidden') !== null
    })

    it('shows the instructions', () => {
      expect(isHidden).to.be.false
    })

  })

  context('purchase options', () => {
    let component
    let isHidden
    const props = mapStateToProps({ purchaseOptions : [{}, {}] })

    beforeEach(() => {
      const wrapper = renderIntoDocument(<Wrapper {...props}/>)
      component = findRenderedDOMComponentWithClass(wrapper, 'instructions')

      isHidden = component.attributes.getNamedItem('hidden') !== null
    })

    it('hides instructions', () => {
      expect(isHidden).to.be.true
    })

  })

})
