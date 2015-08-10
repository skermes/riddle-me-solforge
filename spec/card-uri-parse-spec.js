var URI = require('../js/uri');

describe('Card URI parsing', function() {
  it('can read a simple uri', function() {
    var uri = 'SASD.3';
    var card = {
      cardId: 'SASD',
      level: 3
    };

    expect(URI.parseCard(uri)).toEqual(card);
  });

  it ('can read a card with health', function() {
    var uri = 'ERT_903.1.h30';
    var card = {
      cardId: 'ERT_903',
      level: 1,
      health: 30
    };

    expect(URI.parseCard(uri)).toEqual(card);
  });

  it('can read a card with attack', function() {
    var uri = 'LKJ_3.2.a11';
    var card = {
      cardId: 'LKJ_3',
      level: 2,
      attack: 11
    };

    expect(URI.parseCard(uri)).toEqual(card);
  });

  it('can read a card with zero attack', function() {
    var uri = 'ASD.1.a0';
    var card = {
      cardId: 'ASD',
      level: 1,
      attack: 0
    };

    expect(URI.parseCard(uri)).toEqual(card);
  });

  it('can read a card with negative attack', function() {
    var uri = 'ASD.2.a-23';
    var card = {
      cardId: 'ASD',
      level: 2,
      attack: -23
    };

    expect(URI.parseCard(uri)).toEqual(card);
  });

  it('can read a card with defensive', function() {
    var uri = 'ASD.2.d';
    var card = {
      cardId: 'ASD',
      level: 2,
      defensive: true
    };

    expect(URI.parseCard(uri)).toEqual(card);
  });

  it('can read a card with multiple properties', function() {
    var uri = 'ASD.4.a20.h1.d';
    var card = {
      cardId: 'ASD',
      level: 4,
      attack: 20,
      health: 1,
      defensive: true
    };

    expect(URI.parseCard(uri)).toEqual(card);
  });

  it('can read a card with a keyword', function() {
    var uri = 'ZXC.2.F';
    var card = {
      cardId: 'ZXC',
      level: 2,
      keywords: [['aggressive']]
    };

    expect(URI.parseCard(uri)).toEqual(card);
  });

  it('can read a card with a keyword and value', function() {
    var uri = '1.4.A30';
    var card = {
      cardId: '1',
      level: 4,
      keywords: [['armor', 30]]
    };

    expect(URI.parseCard(uri)).toEqual(card);
  });

  it('can read a card with several keywords', function() {
    var uri = 'Treefolk_1.1.B.M2.D.R1';
    var card = {
      cardId: 'Treefolk_1',
      level: 1,
      keywords: [['breakthrough'], ['mobility', 2], ['defender'], ['regenerate', 1]]
    };

    expect(URI.parseCard(uri)).toEqual(card);
  });

  it('can read a card with everything', function() {
    var uri = 'ASDF.1.h10.a8.d.F.A1.B.C.D.M2.O.R2.S.P1';
    var card = {
      cardId: 'ASDF',
      level: 1,
      health: 10,
      attack: 8,
      defensive: true,
      keywords: [['aggressive'], ['armor', 1], ['breakthrough'], ['consistent'],
                 ['defender'], ['mobility', 2], ['overload'], ['regenerate', 2],
                 ['special'], ['poison', 1]]
    };

    expect(URI.parseCard(uri)).toEqual(card);
  });

  it('can read a missing card', function() {
    expect(URI.parseCard('')).toBe(undefined);
  });
});
