var React = require('react');
var FareInput = require('./components/fare_input.jsx');
var Instructions = require('./components/instructions.jsx');
var PurchaseOptions = require('./components/purchase_options.jsx');

var App = React.createClass({
  render (){
    return (
      <main className="fare-calculator">
        <FareInput />
        <PurchaseOptions />
        <Instructions />
      </main>
    )
  }
});

React.render(<App />, document.body)