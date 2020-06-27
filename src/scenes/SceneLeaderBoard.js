import createLeaderBoard from "./leaderBoard";
import "phaser";
import ScrollingBackground from "./entityScrollingBackground";
class SceneLeaderBoard extends Phaser.Scene {
  constructor() {
    super({ key: "SceneLeaderBoard" });
  }
  preload() {
    this.load.image("sprBtnRestart", "content/exit_buttons.png");
    this.load.image("sprBtnRestartHover", "content/exit_buttons_pressed.png");
    this.load.image("sprBtnRestartDown", "content/exit_buttons_pressed.png");
    this.load.audio("sndBtnOver", "content/sndBtnOver.wav");
    this.load.audio("sndBtnDown", "content/sndBtnDown.wav");
  }
  create() {
    createLeaderBoard(this);
    this.sfx = {
      btnOver: this.sound.add("sndBtnOver"),
      btnDown: this.sound.add("sndBtnDown"),
    };

    this.btnRestart = this.add.sprite(
      this.game.config.width * 0.5,
      this.game.config.height * 0.8,
      "sprBtnRestart"
    );

    this.btnRestart.setInteractive();

    this.btnRestart.on(
      "pointerover",
      function () {
        this.btnRestart.setTexture("sprBtnRestartHover"); // set the button texture to sprBtnPlayHover
        this.sfx.btnOver.play(); // play the button over sound
      },
      this
    );

    this.btnRestart.on("pointerout", function () {
      this.setTexture("sprBtnRestart");
    });

    this.btnRestart.on(
      "pointerdown",
      function () {
        this.btnRestart.setTexture("sprBtnRestartDown");
        this.sfx.btnDown.play();
      },
      this
    );

    this.btnRestart.on(
      "pointerup",
      function () {
        this.btnRestart.setTexture("sprBtnRestart");
        this.scene.start("SceneMainMenu");
      },
      this
    );
    this.backgrounds = [];
    for (var i = 0; i < 5; i++) {
      var keys = ["sprBg0", "sprBg1"];
      var key = keys[Phaser.Math.Between(0, keys.length - 1)];
      var bg = new ScrollingBackground(this, key, i * 10);
      this.backgrounds.push(bg);
    }
  }

  update() {
    for (var i = 0; i < this.backgrounds.length; i++) {
      this.backgrounds[i].update();
    }
  }
}

export default SceneLeaderBoard;
