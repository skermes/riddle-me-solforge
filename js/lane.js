var _ = require('lodash');
var React = require('react');
var DropTarget = require('react-dnd').DropTarget;
var dom = React.DOM;
var Card = React.createFactory(require('./card'));
var boardActions = require('./actions').board;
var ItemTypes = require('./constants').ItemTypes;

var laneTarget = {
  drop: function(props, monitor) {
    boardActions.moveCard(monitor.getItem(), {side: props.side, lane: props.index});
  }
};

var collect = function(connect, monitor) {
  return {
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver()
  };
};

var Lane = React.createClass({
  displayName: 'Lane',
  render: function() {
    var connectDropTarget = this.props.connectDropTarget;

    var position = {side: this.props.side, lane: this.props.index};
    var card = undefined;
    if (this.props.card) {
      var baseCard = this.props.dictionary[this.props.card.cardId];
      var level = Math.min(this.props.card.level, baseCard.levels.length);
      var baseLevel = baseCard.levels[level - 1];

      var cardProps = _.merge({
        cardId: this.props.card.cardId,
        position: position,
        editing: this.props.editing
      }, baseLevel, this.props.card);
      card = Card(cardProps);
    }

    var className = 'lane';
    if (this.props.activeLane &&
        this.props.side == this.props.activeLane.side &&
        this.props.index == this.props.activeLane.lane) {
      className += ' active-lane';
    }

    if (this.props.isOver) {
      className += ' dropping-lane';
    }

    if (!this.props.card) {
      className += ' empty-lane';
    }

    return connectDropTarget(
      dom.div({
        className: className,
        onClick: this.onClick
      }, card));
  },

  onClick: function(e) {
    if (!this.props.editing) {
      return;
    }

    var lane = {side: this.props.side, lane: this.props.index};

    if (this.props.card && !this.props.activeLane) {
      boardActions.selectCard(lane);
    } else if (this.props.activeLane) {
      boardActions.moveCard(this.props.activeLane, lane);
    }
  }
});

module.exports = DropTarget(ItemTypes.CARD, laneTarget, collect)(Lane);
