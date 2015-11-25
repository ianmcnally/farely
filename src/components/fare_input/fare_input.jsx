import React, { Component } from 'react'
import { findDOMNode } from 'react-dom'
import FareActions from '../../actions/fare_actions'
import CurrencyMaskedInput from 'react-currency-masked-input'

export default class FareInput extends Component {

  constructor (props) {
    super(props)

    this.state = {
      remainingBalance : null,
      maxToSpend : 40
    }
  }

  setFareParameters () {
    let remainingBalance = findDOMNode(this.refs.balanceInput).value
    let maxToSpend = findDOMNode(this.refs.maxInput).value

    FareActions.updateFareParameters(remainingBalance, maxToSpend)

    this.setState({remainingBalance, maxToSpend})
  }

  render () {
    return (
      <form name="farepurchase">
        <section>
          <h3>Remaining balance</h3>
          <label htmlFor="remaining">$</label>
          <CurrencyMaskedInput name="remaining" ref="balanceInput" onChange={this.setFareParameters.bind(this)} required placeholder="0.00" autofocus/>
        </section>
        <section>
          <h3>Max to spend</h3>
          <label htmlFor="max">$</label>
          <CurrencyMaskedInput name="max" ref="maxInput" value={this.state.maxToSpend} onChange={this.setFareParameters.bind(this)} required placeholder="0.00"/>
        </section>
      </form>
    )
  }

}
