import fareService from '../fare';
import RATES from '../../constants/rates';

describe('fareService', () => {

  describe('amountsToAdd', () => {

    it('takes a $0 balance', () => {
      let expectedRideCount = 4;
      let amounts = fareService.amountsToAdd(0, 40);

      expect(amounts.length).toBe(expectedRideCount);
      expect(amounts[0].rides).toEqual(11);
      expect(amounts[0].amount).toEqual('27.25');
      expect(amounts[expectedRideCount - 1].rides).toEqual(1);
      expect(amounts[expectedRideCount - 1].amount).toEqual('2.75');
    });

    it('calculates the bonus for amounts > the bonus minimum', () => {
      let amounts = fareService.amountsToAdd(0.01, 20);

      expect(Number(amounts[0].amount) >= RATES.BONUS_MIN)
        .toBe(true);
    });

    it('takes a maximum-to-add value', () => {
      let maxToSpend = 20;

      let amounts = fareService.amountsToAdd(10, maxToSpend);

      expect(Number(amounts[0].amount) <= maxToSpend)
        .toBe(true);
    });

    it('caps the max-to-add at TRANSACTION_MAX', () => {
      let amounts = fareService.amountsToAdd(10, RATES.TRANSACTION_MAX + 15)

      expect(Number(amounts[0].amount) <= RATES.TRANSACTION_MAX)
        .toBe(true);
    });

  });

});