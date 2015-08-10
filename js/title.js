var React = require('react');
var Reflux = require('reflux');

var dom = React.DOM;

var puzzleStore = require('./puzzle-store');
var boardActions = require('./actions').board;

var LINE_HEIGHT = 40;

var Title = React.createClass({
  displayName: 'Title',

  mixins: [Reflux.connect(puzzleStore, 'puzzle')],

  getInitialState: function() {
    return {
      lines: 1
    };
  },

  render: function() {
    var change = undefined;
    if (this.props.editing) {
      change = this.changeTitle;
    }

    return dom.div({id: 'title'},
      dom.textarea({
        ref: 'input',
        onChange: change,
        style: {height: this.state.lines * LINE_HEIGHT},
        value: this.state.puzzle.title,
        disabled: !this.props.editing
      }));
  },

  componentDidMount: function() {
    // If we don't defer this the css or something won't have kicked in when
    // we do the height calculation and it'll think it's one line no matter
    // what.  Grody hack, but wev.
    setTimeout(function() {
      var elem = this.refs.input.getDOMNode();
      this.setState({lines: Math.ceil(elem.scrollHeight / LINE_HEIGHT)});
    }.bind(this), 0);
  },

  changeTitle: function(e) {
    var title = e.target.value;
    boardActions.changeTitle(title);

    var elem = this.refs.input.getDOMNode();
    if (elem.clientHeight < elem.scrollHeight) {
      this.setState({lines: this.state.lines + 1});
    }
  }
});

module.exports = Title;
