var React = require('react');
var Reflux = require('reflux');
var DragDropContext = require('react-dnd').DragDropContext;
var DropTarget = require('react-dnd').DropTarget;
var HTML5Backend = require('react-dnd/modules/backends/HTML5');
var ItemTypes = require('./constants').ItemTypes;
var boardActions = require('./actions').board;

var dom = React.DOM;
var Board = React.createFactory(require('./board'));
var Title = React.createFactory(require('./title'));
var Search = React.createFactory(require('./search'));
var MenuLayer = React.createFactory(require('./menu-layer'));
var ModalLayer = React.createFactory(require('./modal-layer'));
var Toolbar = React.createFactory(require('./toolbar'));
var AppState = require('./app-state-store');

var backdropTarget = {
  drop: function(props, monitor) {
    if (!monitor.didDrop()) {
      boardActions.removeCard(monitor.getItem());
    }
  }
};

var collect = function(connect, monitor) {
  return {
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver()
  };
};

var App = React.createClass({
  displayName: 'App',

  mixins: [Reflux.connect(AppState, 'app')],

  render: function() {
    var connectDropTarget = this.props.connectDropTarget;
    var editing = this.state.app.editing;

    var search = undefined;
    var className = '';
    if (editing) {
      search = dom.div({className: 'side'}, Search());
      className += ' app-editing';
    }

    return connectDropTarget(dom.div({id:'backdrop', className: className},
      Toolbar({editing: editing}),
      dom.div({id: 'container'},
        search,
        dom.div({className: 'main'},
          Title({editing: editing}),
          Board({editing: editing})),
        MenuLayer(),
        ModalLayer())));
  }
});

var dropApp = DropTarget(ItemTypes.CARD, backdropTarget, collect)(App);
module.exports = DragDropContext(HTML5Backend)(dropApp);
