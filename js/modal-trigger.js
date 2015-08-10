var React = require('react');
var dom = React.DOM;
var uiActions = require('./actions').ui;

var ModalTrigger = React.createClass({
  displayName: 'Modal Trigger',

  render: function() {
    var trigger = React.Children.only(this.props.children);

    return dom.div({
      className: 'modal-trigger ' + this.props.className,
      onClick: this.openModal
    }, trigger);
  },

  openModal: function(e) {
    e.stopPropagation();
    uiActions.openModal(this.props.modal, this.props.modalProps);
  }
});

module.exports = ModalTrigger;
