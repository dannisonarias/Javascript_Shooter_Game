import Phaser from "phaser";
import SceneMainMenu from "./scenes/SceneMainMenu";
import SceneMain from "./scenes/SceneMain";
import SceneGameOver from "./scenes/SceneGameOver";
import SceneLeaderBoard from "./scenes/SceneLeaderBoard";

const config = {
  type: Phaser.WEBGL,
  parent: "game",
  width: 480,
  height: 640,
  backgroundColor: "black",
  physics: {
    default: "arcade",
    arcade: {
      gravity: { x: 0, y: 0 },
    },
  },

  scene: [SceneMainMenu, SceneMain, SceneGameOver, SceneLeaderBoard],

  pixelArt: true,
  roundPixels: true,
};
// eslint-disable-next-line
const game = new Phaser.Game(config);
