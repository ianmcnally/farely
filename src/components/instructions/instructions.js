import React from 'react'
import { connect } from 'react-redux'

export const Instructions = ({ hidden }) => (
  <p className='instructions' hidden={hidden}>
    Enter your MetroCard's remaining balance to calculate the exact amount to put on it. No nickels and dimes wasted.
  </p>
)

export const mapStateToProps = ({ purchaseOptions }) => ({ hidden : Boolean(purchaseOptions.length) })

export default connect(mapStateToProps)(Instructions)

