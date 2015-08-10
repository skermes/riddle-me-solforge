var URI = require('../js/uri');

describe('Card URI rendering', function() {
  it('renders a card with id and level', function() {
    var card = {
      cardId: 'SF2_003',
      level: 2
    };

    expect(URI.renderCard(card)).toBe('SF2_003.2');
  });

  it('renders a card with health', function() {
    var card = {
      cardId: 'HM345',
      level: 1,
      health: 24
    };

    expect(URI.renderCard(card)).toBe('HM345.1.h24');
  });

  it('renders a card with attack', function() {
    var card = {
      cardId: 'SF4043',
      level: 3,
      attack: 10
    };

    expect(URI.renderCard(card)).toBe('SF4043.3.a10');
  });

  it('renders a card with 0 attack', function() {
    var card = {
      cardId: 'ASD',
      level: 4,
      attack: 0
    };

    expect(URI.renderCard(card)).toBe('ASD.4.a0')
  });

  it('renders a card with negative attack', function() {
    var card = {
      cardId: 'LK3',
      level: 2,
      attack: -20
    };

    expect(URI.renderCard(card)).toBe('LK3.2.a-20');
  });

  it('renders a card with defensive', function() {
    var card = {
      cardId: 'SDF',
      level: 2,
      defensive: true
    };

    expect(URI.renderCard(card)).toBe('SDF.2.d');
  });

  it('renders a card with aggressive', function() {
    var card = {
      cardId: 'AGG',
      level: 1,
      keywords: [['aggressive']]
    };

    expect(URI.renderCard(card)).toBe('AGG.1.F')
  });

  it('renders a card with a keyword value', function() {
    var card = {
      cardId: 'KEW',
      level: 3,
      keywords: [['armor', 2]]
    };

    expect(URI.renderCard(card)).toBe('KEW.3.A2');
  });

  it('renders a card with several keywords', function() {
    var card = {
      cardId: 'SDP',
      level: 3,
      keywords: [['breakthrough'], ['mobility', 3], ['overload'], ['poison', 4]]
    };

    expect(URI.renderCard(card)).toBe('SDP.3.B.M3.O.P4');
  });

  it('renders a card with everything', function() {
    var card = {
      cardId: 'Treefolk_Token',
      level: 1,
      attack: 7,
      health: 7,
      defensive: true,
      keywords: [['aggressive'], ['armor', 20], ['breakthrough'], ['consistent'],
                 ['defender'], ['mobility', 4], ['overload'], ['regenerate', 10],
                 ['poison', 14], ['special']]
    };

    expect(URI.renderCard(card)).toBe('Treefolk_Token.1.h7.a7.d.F.A20.B.C.D.M4.O.R10.P14.S');
  });

  it('renders a missing card', function() {
    expect(URI.renderCard(undefined)).toBe('');
  })
});
