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

    xit('triggers an update fare parameters action', () => {
      let updatedValue = '3'

      let input = React.findDOMNode(balanceInput);
      input.value = updatedValue;
      addons.TestUtils.Simulate.change(input);

      expect(FareActions.updateFareParameters).toHaveBeenCalledWith(updatedValue, '40');
    });

    xit('updates the state fare parameters', () => {
      let updatedValue = '10'

      let input = React.findDOMNode(balanceInput);
      input.value = updatedValue;
      addons.TestUtils.Simulate.change(input);

      expect(fareInput.state.remainingBalance).toEqual(updatedValue);
    });

  });

  describe('setting the spend maximum', () => {

    let maxInput;

    beforeEach(() => {
      maxInput = fareInput.refs.maxInput;
      spyOn(FareActions, 'updateFareParameters');
    });

    xit('triggers an update fare parameters action', () => {
      let updatedValue = '80';

      let input = React.findDOMNode(maxInput);
      input.value = updatedValue;
      addons.TestUtils.Simulate.change(input);

      expect(FareActions.updateFareParameters).toHaveBeenCalledWith(null, updatedValue);
    });

    xit('updates the state fare parameters', () => {
      let updatedValue = '80'

      let input = React.findDOMNode(maxInput);
      input.value = updatedValue;
      addons.TestUtils.Simulate.change(input);

      expect(fareInput.state.maxToSpend).toEqual(updatedValue);
    });

  });

});