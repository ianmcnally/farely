var React = require('react');

export default React.createClass({

  getInitialState(){
    return {
      remainingBalance : null,
      maxToSpend : 40.00
    }
  },

  setMaxToSpend(event){
    this.setState({
      maxToSpend : event.target.valueAsNumber
    });
  },

  setRemainingBalance(event){
    this.setState({
      remainingBalance : event.target.valueAsNumber
    });
  },

  render(){
    return (
      <form name="farepurchase">
        <label htmlFor="remaining">
          <h3>Remaining balance</h3>
          <input name="remaining" value={this.state.remainingBalance} onChange={this.setRemainingBalance} type="number" required placeholder="0.00"/>
        </label>
        <label htmlFor="max">
          <h3>Max to spend</h3>
          <input name="max" type="number" value={this.state.maxToSpend} onChange={this.setMaxToSpend} required placeholder="40.00"/>
        </label>
      </form>
    );
  }
});