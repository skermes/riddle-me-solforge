var Reflux = require('reflux');
var uiActions = require('./actions').ui;

var _modalState = {
  open: false,
  component: undefined,
  props: undefined
};

var Modal = Reflux.createStore({
  listenables: uiActions,

  onOpenModal: function(component, props) {
    _modalState.open = true;
    _modalState.component = component;
    _modalState.props = props;
    this.trigger(_modalState);
  },

  onCloseModal: function() {
    _modalState.open = false;
    _modalState.component = undefined;
    _modalState.props = undefined;
    this.trigger(_modalState);
  },

  getInitialState: function() {
    return _modalState;
  }
});

module.exports = Modal;

