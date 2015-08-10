var React = require('react');
var dom = React.DOM;
var Reflux = require('reflux');

var PuzzleStore = require('./puzzle-store');

var markdown = function(url, title) {
  return '[' + title + '](' + url + ')';
};

var html = function(url, title) {
  return '<a href="' + url + '">' + title + '</a>';
};

var ShareMenu = React.createClass({
  displayName: 'Share Menu',

  mixins: [Reflux.connect(PuzzleStore, 'puzzle')],

  render: function() {
    var url = window.location;
    var title = this.state.puzzle.title;

    return dom.div({className: 'share-menu'},
      dom.label({}, 'Link'),
      dom.input({type: 'text', value: url, onClick: this.select}),
      dom.label({}, 'Reddit / Markdown'),
      dom.input({type: 'text', value: markdown(url, title), onClick: this.select}),
      dom.label({}, 'HTML'),
      dom.input({type: 'text', value: html(url, title), onClick: this.select}));
  },

  select: function(event) {
    var input = event.target;
    input.select();
  }
});

module.exports = ShareMenu;
