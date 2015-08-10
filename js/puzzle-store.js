var _ = require('lodash');
var Util = require('./util');
var Reflux = require('reflux');
var boardActions = require('./actions').board;
var CardDictionary = require('./card-dictionary-store');

var defaultState = function() {
  return {
    title: 'Edit this title',
    opponent: {
      cards: [undefined, undefined, undefined, undefined, undefined],
      health: 100,
      rank: 1,
      turn: 1
    },
    player: {
      cards: [undefined, undefined, undefined, undefined, undefined],
      health: 100,
      rank: 1,
      turn: 1
    },
    hand: {
      cards: [undefined, undefined, undefined, undefined, undefined]
    }
  };
};

var _puzzleState = defaultState();

var Puzzle = Reflux.createStore({
  listenables: boardActions,

  onChangeTitle: function(title) {
    _puzzleState.title = title;
    this.trigger(_puzzleState);
  },

  onReplaceBoard: function(newState) {
    _puzzleState = newState;
    this.trigger(_puzzleState);
  },

  onNewBoard: function() {
    _puzzleState = defaultState();
    this.trigger(_puzzleState);
  },

  onMoveCard: function(from, to) {
    var card;
    if (from.side === 'search') {
      card = from.card;
    } else {
      card = _puzzleState[from.side].cards[from.lane];
      _puzzleState[from.side].cards[from.lane] = undefined;
    }

    _puzzleState[to.side].cards[to.lane] = card;
    this.trigger(_puzzleState);
  },

  onRemoveCard: function(position) {
    if (position.side === 'search') {
      return;
    }

    _puzzleState[position.side].cards[position.lane] = undefined;
    this.trigger(_puzzleState);
  },

  onChangeStatus: function(side, valueName, value) {
    _puzzleState[side][valueName] = value;
    this.trigger(_puzzleState);
  },

  onChangeCardStat: function(position, statName, stat) {
    _puzzleState[position.side].cards[position.lane][statName] = stat;
    this.trigger(_puzzleState);
  },

  onChangeKeywordValue: function(position, index, value) {
    _puzzleState[position.side].cards[position.lane].keywords[index][1] = value;
    this.trigger(_puzzleState);
  },

  onAddAttribute: function(position, attribute) {
    var card = _puzzleState[position.side].cards[position.lane];

    if (!Util.exists(card.keywords)) {
      card.keywords = CardDictionary.getBaseLevel(card).keywords;
    }

    if (attribute === 'defensive') {
      card.defensive = true;
    } else if (attribute === 'armor' || attribute === 'mobility' ||
               attribute === 'poison' || attribute === 'regenerate') {
      card.keywords.push([attribute, 1]);
    } else {
      card.keywords.push([attribute]);
    }
    this.trigger(_puzzleState);
  },

  onRemoveAttribute: function(position, attribute) {
    var card = _puzzleState[position.side].cards[position.lane];

    if (!Util.exists(card.keywords)) {
      card.keywords = CardDictionary.getBaseLevel(card).keywords;
    }

    if (attribute === 'defensive') {
      card.defensive = false;
    } else {
      var index = _.findIndex(card.keywords, function(kw) { return kw[0] === attribute });

      if (index >= 0) {
        card.keywords.splice(index, 1);
      }
    }
    this.trigger(_puzzleState);
  },

  getInitialState: function() {
    return _puzzleState;
  }
})

module.exports = Puzzle;
