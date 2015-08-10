var Reflux = require('reflux');

var boardActions = Reflux.createActions([
  'changeTitle',

  'selectCard',
  'moveCard',
  'removeCard',

  'changeStatus',
  'changeCardStat',
  'changeKeywordValue',
  'addAttribute',
  'removeAttribute',

  'replaceBoard',
  'newBoard'
]);

var uiActions = Reflux.createActions([
  'openMenu',
  'closeMenu',

  'openModal',
  'closeModal'
]);

var cardDataActions = Reflux.createActions([
  'loaded',
  'failedToLoad'
]);

var appActions = Reflux.createActions([
  'startEditing'
]);

module.exports = {
  board: boardActions,
  ui: uiActions,
  cardData: cardDataActions,
  app: appActions
}
