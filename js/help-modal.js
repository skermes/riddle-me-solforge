var React = require('react');
var dom = React.DOM;

var HelpModal = React.createClass({
  displayName: 'Help',

  render: function() {
    return dom.div({className: 'help'},
      dom.h1({}, 'What is this even?'),
      dom.p({}, 'Riddle Me Solforge lets you make puzzles of Solforge game stats so you can confuse your friends and prove once and for all that you\'re the smartest person on /r/solforge.'),
      dom.p({}, 'When viewing a puzzle, you can edit that puzzle or start a new one with the buttons in the top left.'),
      dom.p({}, 'Search for cards on the left and drag them to the board and your hand.  Edit the title above to clarify the puzzle\'s goal.  Are you trying to find a one-turn lethal, or clear the board, or just find the best possible line?'),
      dom.p({}, 'Once on the board, you can edit the attack and health of any card, or use the gear menu to add and remove keywords.  (You can edit the values on keywords like armor and mobility too.)'),
      dom.p({}, 'Double click on any card to see its levels and text.'),
      dom.p({}, 'You can edit both players\' health and rank directly.  Click around the turn indicator to change the turn.'),
      dom.p({}, 'Once you\'ve finished a puzzle, the share menu will give you some handy ways to link to it on reddit and the forums.'),
      dom.p({className: 'more-space'},
        'Solforge is owned by Stoneblade Entertainment (',
        dom.a({href: 'http://solforgegame.com'}, 'http://solforgegame.com'),
        ').  The code for Riddle Me Solforge can be found at ',
        dom.a({href: '#'}, 'https://github.com/skermes/riddle-me-solforge'),
        '.'));
  }
});

module.exports = HelpModal;
