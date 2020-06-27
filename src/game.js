import "phaser";
import SceneMainMenu from "./scenes/SceneMainMenu";
import SceneMain from "./scenes/SceneMain";
import SceneGameOver from "./scenes/SceneGameOver";

var config = {
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

  scene: [SceneMainMenu, SceneMain, SceneGameOver],

  pixelArt: true,
  roundPixels: true,
};

var game = new Phaser.Game(config);
