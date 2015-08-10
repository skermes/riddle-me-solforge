var React = require('react');
var dom = React.DOM;
var EditableNumber = React.createFactory(require('./editable-number'));
var boardActions = require('./actions').board;

var PlayerStatus = React.createClass({
  displayName: 'Player Status',
  render: function() {
    return dom.div({className: 'player-status'},
      dom.div({className: 'avatar'}),
      dom.div({className: 'frame'}),
      dom.div({className: 'rank-indicator'},
              dom.div({className: 'turn-indicator turn-' + this.props.turn,
                       ref: 'turnIndicator',
                       onClick: this.changeTurn},
                       dom.div({className: 'turn-1-highlight'}),
                       dom.div({className: 'turn-2-highlight'}),
                       dom.div({className: 'turn-3-highlight'})),
              EditableNumber({value: this.props.rank,
                              editing: this.props.editing,
                              minValue: 1,
                              maxValue: 9,
                              action: boardActions.changeStatus,
                              args: [this.props.side, 'rank']})),
      dom.div({className: 'health'},
              EditableNumber({value: this.props.health,
                              editing: this.props.editing,
                              minValue: 1,
                              maxValue: 999,
                              action: boardActions.changeStatus,
                              args: [this.props.side, 'health']})));
  },

  changeTurn: function(e) {
    if (!this.props.editing) {
      return;
    }

    var rect = this.refs.turnIndicator.getDOMNode().getBoundingClientRect();
    var centerX = rect.left + rect.width / 2;
    var centerY = rect.top + rect.height / 2;

    var left = e.clientX <= centerX;
    var top = e.clientY <= centerY;

    var turn = undefined;
    if (left && top) {
      turn = 1;
    } else if (!left && top) {
      turn = 2;
    } else if (!left && !top) {
      turn = 3;
    } else {
      turn = 4;
    }

    boardActions.changeStatus(this.props.side, 'turn', turn);
  }
});

module.exports = PlayerStatus;
