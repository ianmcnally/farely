import fareService from '../fare';
import RATES from '../../constants/rates';

describe('fareService', () => {

  describe('amountsToAdd', () => {

    it('takes a $0 balance', () => {
      let expectedRideCount = 4;
      let amounts = fareService.amountsToAdd(0, 40);

      expect(amounts.length).to.equal(expectedRideCount);
      expect(amounts[0].rides).to.equal(11);
      expect(amounts[0].amount).to.equal('27.25');
      expect(amounts[expectedRideCount - 1].rides).to.equal(1);
      expect(amounts[expectedRideCount - 1].amount).to.equal('2.75');
    });

    it('calculates the bonus for amounts > the bonus minimum', () => {
      let amounts = fareService.amountsToAdd(0.01, 20);

      expect(Number(amounts[0].amount) >= RATES.BONUS_MIN)
        .to.be.true;
    });

    it('takes a maximum-to-add value', () => {
      let maxToSpend = 20;

      let amounts = fareService.amountsToAdd(10, maxToSpend);

      expect(Number(amounts[0].amount) <= maxToSpend)
        .to.be.true;
    });

    it('caps the max-to-add at TRANSACTION_MAX', () => {
      let amounts = fareService.amountsToAdd(10, RATES.TRANSACTION_MAX + 15)

      expect(Number(amounts[0].amount) <= RATES.TRANSACTION_MAX)
        .to.be.true;
    });

  });

});