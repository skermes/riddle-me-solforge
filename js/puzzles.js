var React = require('react');
var App = React.createElement(require('./app'));

// Nothing else depends on these, but we need to load them anyway.
require('./router');

var run = function() {
  var root = document.getElementById('root');
  React.render(App, root);
};

document.addEventListener('DOMContentLoaded', run);
