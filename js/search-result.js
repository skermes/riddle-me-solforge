var React = require('react');
var dom = React.DOM;
var _ = require('lodash');

var SearchResultLevelContainer =
  React.createFactory(require('./search-result-level-container'));
var Card = React.createFactory(require('./card'));

var SearchResult = React.createClass({
  displayName: 'Search Result',
  render: function() {
    var name = this.props.card.levels[0].name;
    var cards = _.map(this.props.card.levels, function(level) {
      var cardProps = {
        position: {
          side: 'search',
          card: {
            cardId: this.props.card.cardId,
            level: level.level
          }
        },
        cardId: this.props.card.cardId,
        key: this.props.card.cardId + '-' + level.level
      };

      return SearchResultLevelContainer({
        level: level,
        cardId: this.props.card.cardId,
        activeLane: this.props.activeLane,
        index: this.props.index,
        key: this.props.card.cardId + '-' + level.level
      });

      // return Card(_.merge(cardProps, level));
    }, this);

    return dom.div({className: 'search-result'},
     dom.div({className: 'card-name'}, name),
     dom.div({className: 'cards'}, cards));
  }
});

module.exports = SearchResult;
