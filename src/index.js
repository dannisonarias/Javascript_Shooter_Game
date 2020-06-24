import "phaser";
import startMenu from './StartMenu'
import startGame from './StartGame'

const config = {
  title: "Starfall",
  width: 800,
  height: 600,
  parent: "game",
  backgroundColor: "#18216D",
  scene:[startMenu,startGame]
};

window.onload = () => {
  var game = new Phaser.Game(config);
};