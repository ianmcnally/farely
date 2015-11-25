import { findDOMNode } from 'react-dom'
import FareInput from '../fare_input.jsx'
import FareActions from '../../../actions/fare_actions'

import {
  renderIntoDocument,
  Simulate
} from 'react-addons-test-utils'

const {
  spy
} = sinon

describe('FareInput', () => {

  let fareInput

  beforeEach(() => {
    fareInput = renderIntoDocument(<FareInput />)
  })

  describe('initialization', () => {

    it('sets the remainingBalance input value to null', () => {
      const { balanceInput } = fareInput.refs

      expect(balanceInput.props.value)
        .to.be.null
    })

    it('sets the maxToSpend input value to 40', () => {
      const { maxInput } = fareInput.refs

      expect(maxInput.props.value)
        .to.equal(40)
    })

  })

  describe('setting the remaining balance', () => {

    let balanceInput

    beforeEach(() => {
      balanceInput = findDOMNode(fareInput.refs.balanceInput)
      spy(FareActions, 'updateFareParameters')
    })

    afterEach(() => {
      FareActions.updateFareParameters.restore()
    })

    it('triggers an update fare parameters action', () => {
      let updatedValue = '3'
      let updatedValueMasked = '0.03'

      Simulate.change(balanceInput, {target: {value: updatedValue}})

      expect(FareActions.updateFareParameters).to.have.been.calledWith(updatedValueMasked, '40')
    })

    it('updates the state fare parameters', () => {
      let updatedValue = '10'
      let updatedValueMasked = '0.10'

      Simulate.change(balanceInput, {target: {value: updatedValue}})

      expect(fareInput.state.remainingBalance).to.equal(updatedValueMasked)
    })

  })

  describe('setting the spend maximum', () => {

    let maxInput

    beforeEach(() => {
      maxInput = findDOMNode(fareInput.refs.maxInput)
      spy(FareActions, 'updateFareParameters')
    })

    afterEach(() => {
      FareActions.updateFareParameters.restore()
    })

    it('triggers an update fare parameters action', () => {
      let updatedValue = '80'
      let updatedValueMasked = '0.80'

      Simulate.change(maxInput, {target: {value: updatedValue}})

      expect(FareActions.updateFareParameters).to.have.been.calledWith('', updatedValueMasked)
    })

    it('updates the state fare parameters', () => {
      let updatedValue = '80'
      let updatedValueMasked = '0.80'

      Simulate.change(maxInput, {target: {value: updatedValue}})

      expect(fareInput.state.maxToSpend).to.equal(updatedValueMasked)
    })

  })

})
