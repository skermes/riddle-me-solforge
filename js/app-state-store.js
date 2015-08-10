var Reflux = require('reflux');
var appActions = require('./actions').app;

var getInitialEditingState = function() {
  return window.location.pathname === '/';
}

var _state = {
  editing: getInitialEditingState()
}

var AppState = Reflux.createStore({
  listenables: appActions,

  onStartEditing: function() {
    _state.editing = true;
    this.trigger(_state);
  },

  getInitialState: function() {
    return _state;
  }
});

module.exports = AppState;
