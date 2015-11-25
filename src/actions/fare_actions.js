import FARE_UPDATES from '../constants/fare_updates'
import Fares from '../stores/fares'

const updateFareParameters = (remainingBalance, maxToSpend) => {
  Fares.dispatch({
    type : FARE_UPDATES.FARE_PARAMETER,
    remainingBalance,
    maxToSpend
  })
}

export default { updateFareParameters }
