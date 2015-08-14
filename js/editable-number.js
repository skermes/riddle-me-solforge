var _ = require('lodash');
var React = require('react');
var dom = React.DOM;

var EditableNumber = React.createClass({
  displayName: 'Editable Number',
  render: function() {
    if (!this.props.editing) {
      return dom.span({className: 'value'}, this.props.value);
    }

    return dom.input({
      type: 'number',
      value: this.props.value,
      onChange: this.change
    });
  },

  change: function(e) {
    if (!this.props.action) {
      return;
    }

    var value = parseInt(e.target.value);
    if (value === NaN) {
      value = 0;
    }

    value = Math.min(this.props.maxValue, Math.max(this.props.minValue, value));

    var args = this.props.args ? _.clone(this.props.args) : [];
    args.push(value);
    this.props.action.apply(null, args);
  }
});

module.exports = EditableNumber;
