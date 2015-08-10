var _ = require('lodash');
var React = require('react');
var dom = React.DOM;
var boardActions = require('./actions').board;
var uiActions = require('./actions').ui;

var cardAttributes = {
  'defensive': false,
  'aggressive': false,
  'armor': false,
  'breakthrough': false,
  'consistent': false,
  'mobility': false,
  'overload': false,
  'poison': false,
  'regenerate': false,
  'special': false
};

var CardMenu = React.createClass({
  displayName: 'Card Menu',

  getInitialState: function() {
    var attributeMap = _.reduce(this.props.keywords, function(m, kw) {
      m[kw[0]] = true;
      return m;
    }, _.clone(cardAttributes));
    attributeMap['defensive'] = !!this.props.defensive;

    return {
      attrs: attributeMap
    }
  },

  render: function() {
    var attributes = _.map(this.state.attrs, function(has, attr) {
      var className = 'menu-entry ' + (has !== false ? 'has-attribute' : '');
      var text = attr[0].toUpperCase() + attr.slice(1);
      var click = function(e) {
        this.toggleAttribute(e, has, attr);
      }.bind(this);

      return dom.div({
        className: className,
        key: attr,
        onClick: click
      },
      dom.img({src: 'img/misc/' + attr + '.png'}),
      text);
    }, this)

    var remove = dom.div({
      className: 'menu-entry menu-entry-dangerous',
      onClick: this.removeCard
    }, 'Remove');

    return dom.div({className: 'card-menu'}, attributes, remove);
  },

  toggleAttribute: function(e, hasAttr, attr) {
    e.stopPropagation();
    if (!hasAttr) {
      boardActions.addAttribute(this.props.position, attr);
      this.setState({attrs: _.set(this.state.attrs, attr, true)});
    } else {
      boardActions.removeAttribute(this.props.position, attr);
      this.setState({attrs: _.set(this.state.attrs, attr, false)});
    }
  },

  removeCard: function(e) {
    e.stopPropagation();
    boardActions.removeCard(this.props.position);
    uiActions.closeMenu();
  }
});

module.exports = CardMenu;
