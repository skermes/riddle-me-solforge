var _ = require('lodash');
var Reflux = require('reflux');
var cardDataActions = require('./actions').cardData;

var _dictionaryState = {
  cardList: undefined,
  cardDict: undefined,
  state: 'loading'
}

var loadDataFromServer = function() {
  var xhr = new XMLHttpRequest();
  xhr.open('GET', '/data/cards.json');
  xhr.responseType = 'json';
  xhr.setRequestHeader('Accept', 'application/json, text/javascript, */*; q=0.01');
  xhr.setRequestHeader('Content-Type', 'application/json');

  xhr.onreadystatechange = function(xhrEvent) {
    if (xhr.readyState === 4)  { // Done
      var success = xhr.status < 400;
      if (success) {
        cardDataActions.loaded(xhr.response);
      } else {
        cardDataActions.failedToLoad();
      }
    }
  };

  xhr.send();
}

var CardDictionary = Reflux.createStore({
  listenables: cardDataActions,

  onLoaded: function(cards) {
    _dictionaryState.cardList = cards;
    _dictionaryState.cardDict = _.reduce(cards, function(dict, card) {
      dict[card.cardId] = card;
      return dict;
    }, {});
    _dictionaryState.state = 'loaded';
    this.trigger(_dictionaryState);
  },

  onFailedToLoad: function() {
    _dictionaryState.cardList = undefined;
    _dictionaryState.cardDict = undefined;
    _dictionaryState.state = 'failed';
    this.trigger(_dictionaryState);
  },

  getInitialState: function() {
    return _dictionaryState;
  },

  getDictionary: function() {
    return _dictionaryState.cardDict;
  },

  getList: function() {
    return _dictionaryState.cardList;
  },

  getBaseLevel: function(card) {
    return _dictionaryState.cardDict[card.cardId].levels[card.level - 1];
  }
});

loadDataFromServer();

module.exports = CardDictionary;
