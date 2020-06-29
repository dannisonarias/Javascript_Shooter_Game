import gameStart from './gameMock';

let game;

beforeEach(() => {
  game = gameStart();
});

describe('test game', () => {
  test('check for game start', () => {
    expect(typeof game).toBe('object');
  });
  test('check scenes', () => {
    // eslint-disable-next-line
    expect(game.scene._pending.length).toBe(4);
  });
});
