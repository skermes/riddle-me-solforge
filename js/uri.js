var _ = require('lodash');
var Util = require('./util');

var keywordCodes = {
  'aggressive': 'F', // Fast
  'armor': 'A',
  'breakthrough': 'B',
  'consistent': 'C',
  'defender': 'D',
  'mobility': 'M',
  'overload': 'O',
  'regenerate': 'R',
  'poison': 'P',
  'special': 'S'
};

var uriTokenCodes = _.merge({
  'h': 'health',
  'a': 'attack',
  'd': 'defensive'
}, _.invert(keywordCodes));

var FIELD_SEPARATOR = '.';
var RECORD_SEPARATOR = '+';

URI = {
  renderCard: function(card) {
    if (!Util.exists(card)) {
      return '';
    }

    var parts = [card.cardId, card.level];

    if (Util.exists(card.health)) {
      parts.push('h' + card.health);
    }

    if (Util.exists(card.attack)) {
      parts.push('a' + card.attack);
    }

    if (card.defensive) {
      parts.push('d');
    }

    var keywordParts = _.map(card.keywords, function(kw) {
      var keyword = kw[0];
      var value = kw[1];

      return keywordCodes[keyword] + (Util.exists(value) ? value : '');
    });

    parts = parts.concat(keywordParts);

    return parts.join(FIELD_SEPARATOR);
  },

  renderPlayerInfo: function(player) {
    return [player.rank, player.turn, player.health].join(FIELD_SEPARATOR);
  },

  parseCard: function(uri) {
    if (uri.length === 0) {
      return undefined;
    }

    var tokens = uri.split(FIELD_SEPARATOR);

    var id = tokens[0];
    var level = Number.parseInt(tokens[1]);

    var card = {
      cardId: id,
      level: level
    };

    card = _.reduce(tokens.slice(2), function(card, token) {
      var tokenCode = token[0];

      if (Util.isUpperCase(tokenCode)) {
        if (!Util.exists(card.keywords)) {
          card.keywords = [];
        }

        var keyword = [uriTokenCodes[tokenCode]];

        if (token.length > 1) {
          keyword.push(Number.parseInt(token.substring(1)));
        }

        card.keywords.push(keyword);
      } else {
        var value = (token.length > 1) ? Number.parseInt(token.substring(1)) : true;
        card[uriTokenCodes[tokenCode]] = value;
      }

      return card;
    }, card);

    return card;
  },

  parsePlayerInfo: function(uri) {
    var tokens = uri.split(FIELD_SEPARATOR);
    return {
      rank: Number.parseInt(tokens[0]),
      turn: Number.parseInt(tokens[1]),
      health: Number.parseInt(tokens[2])
    };
  },

  renderBoard: function(board) {
    var cards = board.opponent.cards.concat(board.player.cards, board.hand.cards);
    var players = [board.opponent, board.player];

    var records = _.map(cards, URI.renderCard).concat(_.map(players, URI.renderPlayerInfo));
    records.push(encodeURIComponent(board.title));

    return records.join(RECORD_SEPARATOR);
  },

  parseBoard: function(uri) {
    var records = uri.split(RECORD_SEPARATOR);

    var title = decodeURIComponent(records[17]);
    var opponent = URI.parsePlayerInfo(records[15]);
    var player = URI.parsePlayerInfo(records[16]);
    var hand = {};

    opponent.cards = _.map(records.slice(0, 5), URI.parseCard);
    player.cards = _.map(records.slice(5, 10), URI.parseCard);
    hand.cards = _.map(records.slice(10, 15), URI.parseCard);

    return {
      title: title,
      opponent: opponent,
      player: player,
      hand: hand
    };
  }
};

module.exports = URI;
