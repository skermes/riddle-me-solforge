var Reflux = require('reflux');
var uiActions = require('./actions').ui;

var _menuState = {
  open: false,
  top: undefined,
  right: undefined,
  component: undefined,
  props: undefined
}

var UIStore = Reflux.createStore({
  listenables: uiActions,

  onOpenMenu: function(trigger, component, props) {
    var triggerElem = trigger.getDOMNode();

    _menuState.open = true;
    _menuState.top = triggerElem.getBoundingClientRect().top;
    _menuState.right = triggerElem.getBoundingClientRect().right;
    _menuState.component = component;
    _menuState.props = props;
    this.trigger(_menuState);
  },

  onCloseMenu: function() {
    _menuState.open = false;
    _menuState.top = undefined;
    _menuState.right = undefined;
    _menuState.component = undefined;
    _menuState.props = undefined;
    this.trigger(_menuState);
  },

  getInitialState: function() {
    return _menuState;
  }
});

module.exports = UIStore;
