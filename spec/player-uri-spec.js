var URI = require('../js/uri');

describe('Player URI', function() {
  it('can render a player', function() {
    var player = {
      rank: 2,
      turn: 1,
      health: 45
    };

    expect(URI.renderPlayerInfo(player)).toBe('2.1.45');
  });

  it('can read a player', function() {
    var uri = '5.4.2';
    var player = {
      rank: 5,
      turn: 4,
      health: 2
    };

    expect(URI.parsePlayerInfo(uri)).toEqual(player);
  })
})
