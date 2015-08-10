var React = require('react');
var dom = React.DOM;
var Reflux = require('reflux');
var MenuStore = require('./menu-store');
var uiActions = require('./actions').ui;

var MenuLayer = React.createClass({
  displayName: 'Menu Layer',

  mixins: [Reflux.connect(MenuStore, 'menu')],

  render: function() {
    if (this.state.menu.open) {
      return dom.div({className: 'menu-layer'},
        dom.div({
          className: 'menu-screen',
          onClick: this.closeMenu
        }, dom.div({
            className: 'menu-container',
            style: {top: this.state.menu.top, left: this.state.menu.right},
            onClick: this.stop
          }, this.state.menu.component(this.state.menu.props))));
    } else {
      return dom.div({className: 'menu-layer menu-layer-closed'});
    }
  },

  stop: function(e) {
    e.stopPropagation();
  },

  closeMenu: function(e) {
    uiActions.closeMenu();
  }
});

module.exports = MenuLayer;
