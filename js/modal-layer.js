var React = require('react');
var dom = React.DOM;
var Reflux = require('reflux');

var ModalStore = require('./modal-store');
var uiActions = require('./actions').ui;

var ModalLayer = React.createClass({
  displayName: 'Modal Layer',

  mixins: [Reflux.connect(ModalStore, 'modal')],

  render: function() {
    if (!this.state.modal.open) {
      return dom.div({className: 'modal-layer-closed'});
    }

    return dom.div({className: 'modal-layer-open'},
      dom.div({
        className: 'modal-screen',
        onClick: this.closeModal
      }, dom.div({
        className: 'modal-container',
        onClick: this.stop
      }, this.state.modal.component(this.state.modal.props))));
  },

  closeModal: function(event) {
    uiActions.closeModal();
  },

  stop: function(event) {
    event.stopPropagation();
  }
});

module.exports = ModalLayer;
