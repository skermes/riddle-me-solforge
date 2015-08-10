var React = require('react');
var dom = React.DOM;
var Sifter = require('sifter');
var Reflux = require('reflux');
var _ = require('lodash');

var CardDictionary = require('./card-dictionary-store');
var BoardActivityStore = require('./board-activity-store');
var SearchResult = React.createFactory(require('./search-result'));

var Search = React.createClass({
  displayName: 'Search',

  mixins: [Reflux.connect(CardDictionary, 'dictionary'),
           Reflux.connect(BoardActivityStore, 'activeLane')],

  getInitialState: function() {
    return {
      lastTimeQueryChanged: undefined,
      shouldShowResults: false,
      query: ''
    }
  },

  componentDidMount: function() {
    this.refs.searchInput.getDOMNode().focus();
  },

  render: function() {
    var results = undefined;
    if (this.state.dictionary.cardList &&
        this.state.query.trim().length > 0 &&
        this.state.shouldShowResults) {
      // Making a new sifter is cheap, so doing it every render is okay.  All
      // the work happens in search.
      var sifter = new Sifter(this.state.dictionary.cardList);
      var items = sifter.search(this.state.query, {
        fields: ['searchText'],
        conjunction: 'and'
      }).items;

      var cards = _.map(items, function(item) {
        return this.state.dictionary.cardList[item.id];
      }, this);

      results = _.map(cards, function(card, index) {
        return SearchResult({
          card: card,
          activeLane: this.state.activeLane,
          index: index,
          key: card.cardId
        });
      }, this);
    }

    return dom.div({className: 'search'},
      dom.input({
        type: 'text',
        placeholder: 'Search...',
        value: this.state.query,
        onChange: this.changeQuery,
        ref: 'searchInput'
      }),
      dom.div({className: 'search-results'}, results));
  },

  changeQuery: function(event) {
    this.setState({
      query: event.target.value,
      lastTimeQueryChanged: (new Date()).valueOf(),
      shouldShowResults: false
    });

    setTimeout(function() {
      var time = (new Date()).valueOf();
      if (time - this.state.lastTimeQueryChanged >= 300) {
        this.setState({shouldShowResults: true});
      }
    }.bind(this), 300);
  }
});

module.exports = Search;
