jest.dontMock('../fare_input.jsx');

import React from 'react';
import {addons} from 'react/addons';
import FareInput from '../fare_input.jsx';
import FareActions from '../../../actions/fare_actions';

describe('FareInput', () => {

  let fareInput;

  beforeEach(() => {
    fareInput = addons.TestUtils.renderIntoDocument(<FareInput />);
  });

  describe('initialization', () => {

    it('sets the remainingBalance input value to null', () => {
      expect(fareInput.refs.balanceInput.value)
        .toEqual(null);
    });

    it('sets the maxToSpend input value to 40', () => {
      var maxInput = fareInput.refs.maxInput;
      expect(maxInput.props.value)
        .toEqual(40);
    });

  });

  describe('setting the remaining balance', () => {

    let balanceInput;

    beforeEach(() => {
      balanceInput = fareInput.refs.balanceInput;
      spyOn(FareActions, 'updateFareParameters');
    });

    it('triggers an update fare parameters action', () => {
      let updatedValue = '3'

      balanceInput.getDOMNode().value = updatedValue;
      addons.TestUtils.Simulate.change(balanceInput.getDOMNode());

      expect(FareActions.updateFareParameters).toHaveBeenCalledWith(updatedValue, '40');
    });

    it('updates the state fare parameters', () => {
      let updatedValue = '10'

      balanceInput.getDOMNode().value = updatedValue;
      addons.TestUtils.Simulate.change(balanceInput.getDOMNode());

      expect(fareInput.state.remainingBalance).toEqual(updatedValue);
    });

  });

  describe('setting the spend maximum', () => {

    let maxInput;

    beforeEach(() => {
      maxInput = fareInput.refs.maxInput;
      spyOn(FareActions, 'updateFareParameters');
    });

    it('triggers an update fare parameters action', () => {
      let updatedValue = '80'

      maxInput.getDOMNode().value = updatedValue;
      addons.TestUtils.Simulate.change(maxInput.getDOMNode());

      expect(FareActions.updateFareParameters).toHaveBeenCalledWith(null, updatedValue);
    });

    it('updates the state fare parameters', () => {
      let updatedValue = '80'

      maxInput.getDOMNode().value = updatedValue;
      addons.TestUtils.Simulate.change(maxInput.getDOMNode());

      expect(fareInput.state.maxToSpend).toEqual(updatedValue);
    });

  });

});