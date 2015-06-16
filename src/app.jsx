import React from 'react';
import AppCacheManager from './services/app_cache_manager.js';
import FareInput from './components/fare_input/fare_input.jsx';
import Instructions from './components/instructions/instructions.jsx';
import PurchaseOptions from './components/purchase_options/purchase_options.jsx';
import Footer from './components/footer/footer.jsx';

let window = window || global || {};
let document = window.document;

export default class App extends React.Component {

  constructor (props) {
    super(props);
  }

  componentDidMount () {
    AppCacheManager.watchForUpdates();
  }

  render () {
    return (
      <main className="fare-calculator">
        <FareInput />
        <PurchaseOptions />
        <Instructions />
        <Footer />
      </main>
    )
  }

}

if (document) { React.render(<App />, document.body); }
