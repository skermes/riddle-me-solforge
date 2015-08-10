var Reflux = require('reflux');
var boardActions = require('./actions').board;

var _active = undefined;

var BoardActivity = Reflux.createStore({
  listenables: boardActions,

  onSelectCard: function(lane) {
    _active = lane;
    this.trigger(_active);
  },

  onMoveCard: function(from, to) {
    _active = undefined;
    this.trigger(_active);
  },

  getInitialState: function() {
    return _active;
  }
});

module.exports = BoardActivity;
