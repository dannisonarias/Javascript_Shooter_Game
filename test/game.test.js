import SceneMain from '../src/scenes/SceneMain';
import gameStart from './gameMock';

let game;
let player;

beforeEach(() => {
  game = gameStart();
});

describe('test SceneMain', () => {
  test('', () => {
    expect(game.delayLevel).toBe(380);
  });
});
