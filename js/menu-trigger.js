var React = require('react');
var dom = React.DOM;
var uiActions = require('./actions').ui;

var MenuTrigger = React.createClass({
  displayName: 'Menu Trigger',

  render: function() {
    var trigger = React.Children.only(this.props.children);

    return dom.div({
      className: 'menu-trigger ' + this.props.className,
      onClick: this.openMenu,
      ref: 'trigger'
    }, trigger);
  },

  openMenu: function(e) {
    e.stopPropagation();
    uiActions.openMenu(this.refs.trigger, this.props.menu, this.props.menuProps);
  }
});

module.exports = MenuTrigger;
