import React from 'react';
import FareInput from './components/fare_input/fare_input.jsx';
import Instructions from './components/instructions/instructions.jsx';
import PurchaseOptions from './components/purchase_options/purchase_options.jsx';

class App extends React.Component {

  render () {
    return (
      <main className="fare-calculator">
        <FareInput />
        <PurchaseOptions />
        <Instructions />
      </main>
    )
  }

}

React.render(<App />, document.body)