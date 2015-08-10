var React = require('react');
var dom = React.DOM;

var LaneNumber = React.createClass({
  displayName: 'Lane Number',
  render: function() {
    return dom.div({className: 'lane-number'}, this.props.number);
  }
});

module.exports = LaneNumber;
