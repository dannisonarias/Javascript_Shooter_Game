import Phaser from "phaser";
import ScrollingBackground from "./entityScrollingBackground";
import localScore from "./localScore";

class SceneMainMenu extends Phaser.Scene {
  constructor() {
    super({ key: "SceneMainMenu" });
  }

  preload() {
    this.load.setBaseURL("./assets/");
    this.load.image("sprBg0", "content/sprBg0.png");
    this.load.image("sprBg1", "content/sprBg1.png");
    this.load.image("sprBtnPlay", "content/play_buttons.png");
    this.load.image("sprBtnPlayHover", "content/play_button_pressed.png");
    this.load.image("sprBtnPlayDown", "content/play_button_pressed.png");
    this.load.image("sprBtnRestart", "content/exit_buttons.png");
    this.load.image("sprBtnRestartHover", "content/exit_buttons_pressed.png");
    this.load.image("sprBtnRestartDown", "content/exit_buttons_pressed.png");
    this.load.audio("sndBtnOver", "content/sndBtnOver.wav");
    this.load.audio("sndBtnDown", "content/sndBtnDown.wav");
  }

  create() {
    // creating slide out effects for name input
    // end

    this.sfx = {
      btnOver: this.sound.add("sndBtnOver"),
      btnDown: this.sound.add("sndBtnDown"),
    };

    this.btnPlay = this.add.sprite(
      this.game.config.width * 0.5,
      this.game.config.height * 0.5,
      "sprBtnPlay"
    );

    this.btnPlay.setInteractive();

    this.btnPlay.on(
      "pointerover",
      function () {
        this.btnPlay.setTexture("sprBtnPlayHover"); // set the button texture to sprBtnPlayHover
        this.sfx.btnOver.play(); // play the button over sound
      },
      this
    );

    this.btnPlay.on("pointerout", function () {
      this.setTexture("sprBtnPlay");
    });

    this.btnPlay.on(
      "pointerdown",
      function () {
        this.btnPlay.setTexture("sprBtnPlayDown");
        this.sfx.btnDown.play();
      },
      this
    );

    this.btnPlay.on(
      "pointerup",
      function () {
        this.btnPlay.setTexture("sprBtnPlay");

        // reset and save username to local storage
        localStorage.clear();
        let user = document.getElementById("username").value;
        if (user === "") {
          localScore.saveName("No Name");
        } else {
          localScore.saveName(user);
        }
        // start next Scene
        this.scene.start("SceneMain");
      },
      this
    );

    this.title = this.add.text(
      this.game.config.width * 0.5,
      128,
      "ALIEN INVASION",
      {
        fontFamily: "monospace",
        fontSize: 48,
        fontStyle: "bold",
        color: "#ffffff",
        align: "center",
      }
    );
    this.title.setOrigin(0.5);

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

export default SceneMainMenu;
