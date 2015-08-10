var React = require('react');
var dom = React.DOM;

var MenuTrigger = React.createFactory(require('./menu-trigger'));
var ModalTrigger = React.createFactory(require('./modal-trigger'));
var ShareMenu = React.createFactory(require('./share-menu'));
var HelpModal = React.createFactory(require('./help-modal'));
var boardActions = require('./actions').board;
var appActions = require('./actions').app;

var ToolbarItem = React.createClass({
  displayName: 'Toolbar Item',
  render: function() {
    var click = this.props.onClick;
    var className = 'toolbar-item';

    if (this.props.special) {
      className += ' toolbar-item-special';
    }

    if (this.props.disabled) {
      className += ' toolbar-item-disabled';
      click = undefined;
    }

    return dom.span({
      className: className,
      onClick: click
    }, this.props.children);
  }
});

ToolbarItem = React.createFactory(ToolbarItem);

var Toolbar = React.createClass({
  displayName: 'Toolbar',

  render: function() {
    return dom.div({id: 'toolbar'},
      dom.div({className: 'toolbar-contents'},
        ToolbarItem({special: true},
          MenuTrigger({
            menu: ShareMenu,
            menuProps: {}
          }, dom.span({}, 'Share'))),
        ToolbarItem({
          disabled: this.props.editing,
          onClick: this.startEditing
        }, 'Edit'),
        ToolbarItem({onClick: this.newPuzzle}, 'New Puzzle'),
        ToolbarItem({},
          ModalTrigger({
            modal: HelpModal,
            modalProps: {}
          }, dom.span({}, '?')))));
  },

  newPuzzle: function() {
    boardActions.newBoard();
    appActions.startEditing();
  },

  startEditing: function() {
    appActions.startEditing();
  }
});

module.exports = Toolbar;
