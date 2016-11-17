import React, { Component } from 'react'
import FareActions from '../../actions/fare_actions'
import CurrencyMaskedInput from 'react-currency-masked-input'
import { connect } from 'react-redux'

export class FareInput extends Component {

  constructor ({ maxToSpend }) {
    super({ maxToSpend })
    this.state = { maxToSpend }
  }

  setFareParameters () {
    const remainingBalance = this.refs.balanceInput.value
    const maxToSpend = this.refs.maxInput.value

    FareActions.updateFareParameters(remainingBalance, maxToSpend)

    this.setState({ maxToSpend })
  }

  render () {
    return (
      <form name='farepurchase'>
        <section>
          <h3 id='remaining-balance'>Remaining balance</h3>
          <label htmlFor='remaining'>$</label>
          <CurrencyMaskedInput
            aria-labelledby='remaining-balance'
            name='remaining'
            ref='balanceInput'
            onChange={() => this.setFareParameters()} required placeholder='0.00' autofocus
          />
          <h3 id='max-to-spend'>Max to spend</h3>
          <label htmlFor='max'>$</label>
          <CurrencyMaskedInput
            aria-labelledby='max-to-spend'
            name='max'
            ref='maxInput'
            value={this.state.maxToSpend}
            onChange={() => this.setFareParameters()} required placeholder='0.00'
          />
        </section>
      </form>
    )
  }

}

export const mapStateToProps = ({ maxToSpend }) => ({ maxToSpend })

export default connect(mapStateToProps)(FareInput)
