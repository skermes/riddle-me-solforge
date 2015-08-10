var React = require('react');
var dom = React.DOM;
var Reflux = require('reflux');
var _ = require('lodash');

var CardDictionary = require('./card-dictionary-store');
var Util = require('./util');

var cardText = function(level) {
  var text = '';

  if (level.free) {
    text += 'Free\n';
  }

  var keywordText = _.map(level.keywords, function(keyword) {
    var txt = _.capitalize(keyword[0]);
    if (Util.exists(keyword[1])) {
      txt += ' ' + keyword[1]
    }
    return txt;
  }).join(', ');

  if (keywordText.trim().length !== 0) {
    text += keywordText + '\n\n';
  }

  text += level.text;

  return text;
}

var CardDetails = React.createClass({
  displayName: 'Card Details',

  mixins: [Reflux.connect(CardDictionary, 'dictionary')],

  render: function() {
    // This is spectacularly grody, but it gets around the circular dependency.
    var Card = React.createFactory(require('./card'));

    if (this.state.dictionary.state !== 'loaded') {
      return dom.div({className: 'card-details-unloaded'});
    }

    var card = this.state.dictionary.cardDict[this.props.cardId];
    var levels = _.map(card.levels, function(level) {
      return Card(_.merge({key: card.cardId + '-' + level.level}, level));
    }, this);

    var texts = _.map(card.levels, function(level) {
      return dom.div({
        className: 'card-text',
        key: card.cardId + '-' + level.level
      }, cardText(level));
    });

    return dom.div({className: 'card-details'},
      dom.div({className: 'title'}, card.levels[0].name),
      dom.div({className: 'levels'}, levels),
      dom.div({className: 'texts'}, texts));
  }
});

module.exports = CardDetails;
