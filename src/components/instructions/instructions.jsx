import React, { Component } from 'react'
import Fares from '../../stores/fares'

export default class Instructions extends Component {

  constructor (props) {
    super(props)

    this.state = {
      showInstructions : true
    }
  }

  componentWillMount () {
    Fares.subscribe(this.updateInstructions.bind(this))
  }

  updateInstructions () {
    const { purchaseOptions } = Fares.getState()

    this.setState({
      showInstructions : !purchaseOptions.length
    })
  }

  render(){
    return (
      <p hidden={!this.state.showInstructions}>
        Enter your MetroCard's remaining balance to calculate the exact amount to put on it. No nickels and dimes wasted.
      </p>
    )
  }

}
