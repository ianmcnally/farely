import React, { PropTypes } from 'react'
import { connect } from 'react-redux'

export const PurchaseOptions = ({ purchaseOptions }) => {
  const children = purchaseOptions.map((option, i) => (
    <li key={i} className='purchase-amount'>
      <span className='amount'>{option.amount}</span> for {option.rides} rides
    </li>
  ))

  return <ul className='purchase-amounts'>{children}</ul>
}

PurchaseOptions.propTypes = {
  purchaseOptions : PropTypes.array.isRequired
}

export const mapStateToProps = ({ purchaseOptions }) => ({ purchaseOptions })

export default connect(mapStateToProps)(PurchaseOptions)
