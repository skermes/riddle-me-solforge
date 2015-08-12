var _ = require('lodash');
var React = require('react');
var dom = React.DOM;
var ItemTypes = require('./constants').ItemTypes;
var DragSource = require('react-dnd').DragSource;
var EditableNumber = React.createFactory(require('./editable-number'));
var KeywordIcon = React.createFactory(require('./keyword-icon'));
var MenuTrigger = React.createFactory(require('./menu-trigger'));
var CardMenu = React.createFactory(require('./card-menu'));
var CardDetails = React.createFactory(require('./card-details'));
var boardActions = require('./actions').board;
var uiActions = require('./actions').ui;

var cardType = function(card) {
  return ((card.attack === null || card.attack === undefined) &&
           (card.health === null || card.health === undefined)) ?
         'spell' :
         'creature';
};

var artSrc = function(art) {
  return 'img/art/small_' + art.replace(/ /g, '_').toLowerCase() + '.jpg';
};

var frameSrc = function(level, faction, type) {
  return 'img/frames/lvl' + level + '_' + faction + '_' + type + '_small.png';
};

var cardSource = {
  beginDrag: function(props) {
    return props.position;
  },

  canDrag: function(props, monitor) {
    return props.editing || props.position.side === 'search';
  }
};

var collect = function(connect, monitor) {
  return {
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging()
  }
};

var shouldBeEditing = function(props) {
  return props.editing &&
         props.position &&
         (props.position.side === 'opponent' ||
          props.position.side === 'player')
};

var shouldBeDragging = function(props) {
  return shouldBeEditing(props) || props.position.side === 'search';
};

var Card = React.createClass({
  displayName: 'Card',

  getInitialState: function() {
    return {
      editing: shouldBeEditing(this.props)
    }
  },

  componentWillReceiveProps: function(nextProps) {
    this.setState({editing: shouldBeEditing(nextProps)});
  },

  render: function() {
    var connectDragSource = this.props.connectDragSource;
    var isDragging = this.props.isDragging;

    var className = 'card card-' + cardType(this.props) +
                    ' card-level-' + this.props.level;
    if (isDragging) {
      className += ' dragging-card';
    }

    var attack = undefined;
    if (this.props.attack !== undefined &&
        this.props.attack !== null) {
      attack = dom.span({
        className: 'attack',
        onClick: this.stop,
        onDoubleClick: this.stop
      }, EditableNumber({
          value: this.props.attack,
          editing: this.state.editing,
          minValue: -99,
          maxValue: 999,
          action: boardActions.changeCardStat,
          args: [this.props.position, 'attack']
        }));
    }

    var health = undefined;
    if (this.props.health !== undefined &&
        this.props.health !== null) {
      health = dom.span({
        className: 'health',
        onClick: this.stop,
        onDoubleClick: this.stop
      }, EditableNumber({
          value: this.props.health,
          editing: this.state.editing,
          minValue: 1,
          maxValue: 999,
          action: boardActions.changeCardStat,
          args: [this.props.position, 'health']
      }));
    }

    var keywords = _.map(
      this.props.keywords,
      function(keyword, idx) {
        return KeywordIcon({
          key: idx,
          keyword: keyword,
          position: this.props.position,
          index: idx,
          editing: this.state.editing
        });
      }, this);

    var cardMenu = undefined;
    if (this.state.editing) {
      cardMenu = MenuTrigger({
        className: 'card-menu-trigger',
        menu: CardMenu,
        menuProps: {
          keywords: this.props.keywords,
          defensive: this.props.defensive,
          position: this.props.position
        },
      }, dom.span({}, '\u2699'));
    }

    var defensiveMarker = undefined;
    if (this.props.defensive) {
      defensiveMarker = dom.img({className: 'card-defensive', src: 'img/misc/defensive.png'});
    }

    return connectDragSource(
      dom.div({
        className: className,
        onDoubleClick: this.showCardDetails,
        onDragStart: this.stopDragIfNotEditing
      },dom.img({
          className: 'card-art',
          src: artSrc(this.props.art)
        }),
        dom.img({
          className: 'card-frame',
          src: frameSrc(this.props.level, this.props.faction, cardType(this.props))
        }),
        dom.span({className: 'card-name'}, this.props.name),
        dom.div({className: 'card-menu-container'}, cardMenu),
        defensiveMarker,
        dom.div({className: 'keywords'}, keywords),
        attack,
        health
      ));
  },

  // Cards are often in Lanes, which have click handers that we don't want to
  // deal with here.
  stop: function(e) {
    if (this.state.editing) {
      e.stopPropagation();
    }
  },

  stopDragIfNotEditing: function(e) {
    if (!this.props.editing && !shouldBeDragging(this.props)) {
      e.preventDefault();
      e.stopPropagation();
    }
  },

  showCardDetails: function() {
    uiActions.openModal(CardDetails, {cardId: this.props.cardId});
  }
});

module.exports = DragSource(ItemTypes.CARD, cardSource, collect)(Card);
