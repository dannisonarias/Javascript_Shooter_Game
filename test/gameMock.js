import 'phaser';
import SceneMainMenu from '../src/scenes/SceneMainMenu';
import SceneMain from '../src/scenes/SceneMain';
import SceneGameOver from '../src/scenes/SceneGameOver';
import SceneLeaderBoard from '../src/scenes/SceneLeaderBoard';

const startGame = () => {
  const config = {
    type: Phaser.WEBGL,
    parent: 'game',
    width: 480,
    height: 640,
    backgroundColor: 'black',
    physics: {
      default: 'arcade',
      arcade: {
        gravity: { x: 0, y: 0 },
      },
    },

    scene: [SceneMainMenu, SceneMain, SceneGameOver, SceneLeaderBoard],

    pixelArt: true,
    roundPixels: true,
  };

  const game = new Phaser.Game(config);
  return game;
};

export default startGame;
