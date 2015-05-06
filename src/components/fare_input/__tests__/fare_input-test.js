jest.dontMock('../fare_input.jsx');

import React from 'react';
import {addons} from 'react/addons';
import FareInput from '../fare_input.jsx';
let TestUtils = addons.TestUtils;

describe('FareInput', () => {

  let fareInput;

  beforeEach(() => {
    fareInput = TestUtils.renderIntoDocument(<FareInput />);
  });

  describe('remainingBalance', () => {

    let balanceInput;

    beforeEach(() => {
      balanceInput = fareInput.refs.balanceInput;
    });

    it('initializes the remainingBalance input value to null', () => {
      expect(balanceInput.value)
        .toEqual(null);
    });

  })

  describe('maxToSpend', () => {

    it('initializes the maxToSpend input value to 40', () => {
      var maxInput = fareInput.refs.maxInput;
      expect(maxInput.props.value)
        .toEqual(40);
    });

  })

});