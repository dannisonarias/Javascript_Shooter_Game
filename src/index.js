import "phaser";
import StartMenu from './StartMenu'

const config = {
  title: "Starfall",
  width: 800,
  height: 600,
  parent: "game",
  backgroundColor: "#18216D",
  scene:StartMenu
};

window.onload = () => {
  var game = new Phaser.Game(config);
};