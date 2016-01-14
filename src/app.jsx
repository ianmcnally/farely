import React, { Component } from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { appRoot, canAppRegisterInBrowser } from './services/browser_utilities'
import { watchForUpdates } from './services/app_cache_manager'
import FareInput from './components/fare_input/fare_input.jsx'
import Instructions from './components/instructions/instructions.jsx'
import PurchaseOptions from './components/purchase_options/purchase_options.jsx'
import Footer from './components/footer/footer.jsx'
import store from './stores/fares'

export default class App extends Component {

  componentDidMount () {
    watchForUpdates()
  }

  render () {
    return (
      <Provider store={store}>
        <section className='fare-calculator'>
          <FareInput />
          <PurchaseOptions />
          <Instructions />
          <Footer />
        </section>
      </Provider>
    )
  }

}

if (canAppRegisterInBrowser) { render(<App />, appRoot) }

