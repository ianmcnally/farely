import React, { Component } from 'react'
import { render } from 'react-dom'
import { appRoot, canAppRegisterInBrowser } from './services/browser_utilities'
import { watchForUpdates } from './services/app_cache_manager'
import FareInput from './components/fare_input/fare_input.jsx'
import Instructions from './components/instructions/instructions.jsx'
import PurchaseOptions from './components/purchase_options/purchase_options.jsx'
import Footer from './components/footer/footer.jsx'

export default class App extends Component {

  componentDidMount () {
    watchForUpdates()
  }

  render () {
    return (
      <section className="fare-calculator">
        <FareInput />
        <PurchaseOptions />
        <Instructions />
        <Footer />
      </section>
    )
  }

}

if (canAppRegisterInBrowser) { render(<App />, appRoot) }
