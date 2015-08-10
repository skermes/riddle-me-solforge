var URI = require('./uri');
var puzzleStore = require('./puzzle-store');
var boardActions = require('./actions').board;

var setPath = function(boardState) {
  var path = URI.renderBoard(boardState);
  window.history.replaceState(null, null, path);
}

var setBoardState = function() {
  // Strip leading /
  var data = window.location.pathname.substring(1);

  if (data.trim().length === 0) {
    return;
  }

  var newBoard = URI.parseBoard(data);
  boardActions.replaceBoard(newBoard);
}

puzzleStore.listen(setPath);

window.onpopstate = function(event) {
  setBoardState();
}

setBoardState();
