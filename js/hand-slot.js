var React = require('react');
var dom = React.DOM;
var Lane = React.createFactory(require('./lane'));

var HandSlot = React.createClass({
  displayName: 'Hand Slot',
  render: function() {
    return dom.div({className: 'hand-slot hand-slot-' + this.props.index},
      Lane({
        card: this.props.card,
        dictionary: this.props.dictionary,
        activeLane: this.props.activeLane,
        editing: this.props.editing,
        index: this.props.index,
        side: 'hand'
      }));
  }
});

module.exports = HandSlot;
