var _ = require('lodash');
var React = require('react');
var Reflux = require('reflux');

var dom = React.DOM
var Lane = React.createFactory(require('./lane'));
var LaneNumber = React.createFactory(require('./lane-number'));
var PlayerStatus = React.createFactory(require('./player-status'));
var Hand = React.createFactory(require('./hand'));
var Loading = React.createFactory(require('./loading'));

var PuzzleStore = require('./puzzle-store');
var BoardActivityStore = require('./board-activity-store');
var CardDictionaryStore = require('./card-dictionary-store');

var Board = React.createClass({
  displayName: 'Board',

  mixins: [Reflux.connect(PuzzleStore, 'board'),
           Reflux.connect(BoardActivityStore, 'activeLane'),
           Reflux.connect(CardDictionaryStore, 'cardDictionary')],

  render: function() {
    if (this.state.cardDictionary.state === 'loading') {
      return dom.div({id: 'board'}, Loading());
    }

    var opponentLanes = _.map(
      this.state.board.opponent.cards,
      function(card, idx) {
        return Lane({
          card: card,
          dictionary: this.state.cardDictionary.cardDict,
          index: idx,
          side: 'opponent',
          activeLane: this.state.activeLane,
          editing: this.props.editing,
          key: idx
        });
      }, this);
    var playerLanes = _.map(
      this.state.board.player.cards,
      function(card, idx) {
        return Lane({
          card: card,
          dictionary: this.state.cardDictionary.cardDict,
          index: idx,
          side: 'player',
          activeLane: this.state.activeLane,
          editing: this.props.editing,
          key: idx
        });
      }, this);
    var laneNumbers = _.map(
      this.state.board.player.cards,
      function(card, idx) {
        return LaneNumber({number: idx + 1, key: idx});
      });

    return dom.div({id: 'board'},
      dom.div({id: 'opponent-lanes'}, opponentLanes),
      PlayerStatus(_.merge({side: 'opponent', editing: this.props.editing},
                           this.state.board.opponent)),
      dom.div({id: 'lane-numbers'}, laneNumbers),
      dom.div({id: 'player-lanes'}, playerLanes),
      PlayerStatus(_.merge({side: 'player', editing: this.props.editing},
                           this.state.board.player)),
      Hand({
        cards: this.state.board.hand.cards,
        dictionary: this.state.cardDictionary.cardDict,
        activeLane: this.state.activeLane,
        editing: this.props.editing
      }));
  }
});

module.exports = Board
