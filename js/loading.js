var React = require('react');
var dom = React.DOM;

var Loading = React.createClass({
  displayName: 'Loading',

  render: function() {
    return dom.div({className: 'loading'},
      dom.div({className: 'description'}, 'Loading card data'),
      dom.div({className: 'spinner'},
        dom.div({className: 'highlight'}),
        dom.div({className: 'frame'})));
  }
});

module.exports = Loading;
