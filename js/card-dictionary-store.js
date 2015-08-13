var _ = require('lodash');
var Reflux = require('reflux');
var cardDataActions = require('./actions').cardData;

// I could stick this in a config file or something but it's just as easy for
// me to change this as anything else.
// Might as well keep this value in line with Solforge card releases.
var cardDataVersion = '6.0.1';

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
        var data = xhr.response;

        localStorage.setItem('solforgeCardData', JSON.stringify(data));
        localStorage.setItem('solforgeCardDataVersion', cardDataVersion);

        cardDataActions.loaded(xhr.response);
      } else {
        cardDataActions.failedToLoad();
      }
    }
  };

  xhr.send();
}

var loadDataFromLocalStorage = function() {
  if (!window.localStorage) {
    return false;
  }

  var localVersion = localStorage.getItem('solforgeCardDataVersion');
  if (localVersion === cardDataVersion) {
    cardDataActions.loaded(JSON.parse(localStorage.getItem('solforgeCardData')));
    return true;
  } else {
    return false;
  }
};

var loadData = function() {
  var loadedFromLocalStorage = loadDataFromLocalStorage();
  if (!loadedFromLocalStorage) {
    loadDataFromServer();
  }
};

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

loadData();

module.exports = CardDictionary;
