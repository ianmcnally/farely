var React = require('react');

export default React.createClass({
  render(){
    return (
      <form name="farepurchase">
        <label htmlFor="remaining">
          <h3>Remaining balance</h3>
          <input name="remaining" type="number" required placeholder="0.00" />
        </label>
        <label htmlFor="max">
          <h3>Max to spend</h3>
          <input name="max" type="number" required placeholder="40.00" />
        </label>
      </form>
    );
  }
});