var React = require('react');
var dom = React.DOM;
var EditableNumber = React.createFactory(require('./editable-number'));
var boardActions = require('./actions').board;

var keywordImageSrc = function(keyword) {
  return 'img/misc/' + keyword + '.png';
}

var KeywordIcon = React.createClass({
  displayName: 'Keyword Icon',
  render: function() {
    var keyword = this.props.keyword[0];
    var value = this.props.keyword[1];

    var img = dom.img({className: 'keyword-image', src: keywordImageSrc(keyword)});
    var number = undefined;
    if (value) {
      number = EditableNumber({
        value: value,
        editing: this.props.editing,
        minValue: 1,
        maxValue: 99,
        action: boardActions.changeKeywordValue,
        args: [this.props.position, this.props.index]
      });
    }

    return dom.div({
        className: 'keyword-icon',
        onClick: this.stop,
        onDoubleClick: this.stop
      },
      img,
      number);
  },

  stop: function(e) {
    if (this.props.editing) {
      e.stopPropagation();
    }
  }
});

module.exports = KeywordIcon;
