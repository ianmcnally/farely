jest.dontMock('../fare_input.jsx');

import React from 'react';
import {addons} from 'react/addons';
import FareInput from '../fare_input.jsx';
let TestUtils = addons.TestUtils;


describe('FareInput', () => {
  var fareInput;

  beforeEach(() => {
    fareInput = TestUtils.renderIntoDocument(<FareInput />);
  });

  describe('remainingBalance', () => {

    var balanceInput;

    beforeEach(() => {
      balanceInput = fareInput.refs.balanceInput;
    });

    it('initializes the remainingBalance input value to null', () => {
      expect(balanceInput.value)
        .toEqual(null);
    });

    it('sets the remainingBalance when the input changes', () => {
      let newBalance = '10.05';
      TestUtils.Simulate.change(balanceInput.getDOMNode(), {target: {value: newBalance}});
      console.log(balanceInput);
      expect(balanceInput.value)
        .toEqual(newBalance);
    });

  })

  describe('maxToSpend', () => {

    it('initializes the maxToSpend input value to 40', () => {
      var maxInput = fareInput.refs.maxInput;
      expect(maxInput.props.defaultValue)
        .toEqual(40);
    });

  })

});