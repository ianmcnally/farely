import React from 'react/addons';
import FareInput from '../fare_input.jsx';
import FareActions from '../../../actions/fare_actions';

const {
  renderIntoDocument,
  Simulate
} = React.addons.TestUtils;

describe('FareInput', () => {

  let fareInput;

  beforeEach(() => {
    fareInput = renderIntoDocument(<FareInput />);
  });

  describe('initialization', () => {

    it('sets the remainingBalance input value to null', () => {
      const { balanceInput } = fareInput.refs;

      expect(balanceInput.props.value)
        .toEqual(null);
    });

    it('sets the maxToSpend input value to 40', () => {
      const { maxInput } = fareInput.refs;

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
      let updatedValueMasked = '0.03'

      let input = React.findDOMNode(balanceInput);
      Simulate.change(input, {target: {value: updatedValue}});

      expect(FareActions.updateFareParameters).toHaveBeenCalledWith(updatedValueMasked, '40');
    });

    it('updates the state fare parameters', () => {
      let updatedValue = '10';
      let updatedValueMasked = '0.10';

      let input = React.findDOMNode(balanceInput);
      Simulate.change(input, {target: {value: updatedValue}});

      expect(fareInput.state.remainingBalance).toEqual(updatedValueMasked);
    });

  });

  describe('setting the spend maximum', () => {

    let maxInput;

    beforeEach(() => {
      maxInput = fareInput.refs.maxInput;
      spyOn(FareActions, 'updateFareParameters');
    });

    it('triggers an update fare parameters action', () => {
      let updatedValue = '80';
      let updatedValueMasked = '0.80';

      let input = React.findDOMNode(maxInput);
      Simulate.change(input, {target: {value: updatedValue}});

      expect(FareActions.updateFareParameters).toHaveBeenCalledWith('', updatedValueMasked);
    });

    it('updates the state fare parameters', () => {
      let updatedValue = '80';
      let updatedValueMasked = '0.80';

      let input = React.findDOMNode(maxInput);
      Simulate.change(input, {target: {value: updatedValue}});

      expect(fareInput.state.maxToSpend).toEqual(updatedValueMasked);
    });

  });

});