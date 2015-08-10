var React = require('react');
var dom = React.DOM;
var _ = require('lodash');

var boardActions = require('./actions').board;
var Card = React.createFactory(require('./card'));

var SearchResultLevelContainer = React.createClass({
  displayName: 'Search Result Level Container',

  getInitialState: function() {
    return {
      active: false
    }
  },

  componentWillReceiveProps: function(nextProps) {
    if (!nextProps.activeLane ||
        !nextProps.activeLane.side === 'search' ||
        !nextProps.index === nextProps.activeLane.index ||
        !nextProps.level.level === nextProps.activeLane.level) {
      this.setState({active: false});
    }
  },

  render: function() {
    var cardProps = {
      cardId: this.props.cardId,
      position: {
        side: 'search',
        card: {
          cardId: this.props.cardId,
          level: this.props.level.level
        }
      }
    };

    var className = 'search-result-level';
    if (this.state.active &&
        this.props.activeLane &&
        this.props.activeLane.side === 'search' &&
        this.props.index === this.props.activeLane.index &&
        this.props.level.level === this.props.activeLane.level) {
      className += ' search-result-level-active';
    }

    return dom.div({
      className: className,
      onClick: this.selectCard
    }, Card(_.merge(cardProps, this.props.level)));
  },

  selectCard: function() {
    this.setState({active: true});

    boardActions.selectCard({
      side: 'search',
      index: this.props.index,
      level: this.props.level.level,
      card: {
        cardId: this.props.cardId,
        level: this.props.level.level
      }
    });
  }
});

module.exports = SearchResultLevelContainer;
