var _ = require('lodash');
var React = require('react');
var dom = React.DOM;
var HandSlot = React.createFactory(require('./hand-slot'));

var Hand = React.createClass({
  displayName: 'Hand',
  render: function() {
    var slots = _.map(
      this.props.cards,
      function(card, idx) {
        return HandSlot({
          card: card,
          dictionary: this.props.dictionary,
          activeLane: this.props.activeLane,
          editing: this.props.editing,
          index: idx,
          key: idx
        });
      }, this);

    return dom.div({className: 'hand'}, slots);
  }
});

module.exports = Hand;
