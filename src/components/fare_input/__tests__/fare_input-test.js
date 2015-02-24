jest.dontMock('../fare_input.jsx');

import React from 'react';
import {addons} from 'react/addons';
import FareInput from '../fare_input.jsx';
let TestUtils = addons.TestUtils;


describe('FareInput', () => {

  it('initializes the remainingBalance input value to null', () => {
    var fareInput = TestUtils.renderIntoDocument(<FareInput />);
    var balanceInput = fareInput.refs.balanceInput;
    expect(balanceInput.value)
      .toEqual(null);
  });

});