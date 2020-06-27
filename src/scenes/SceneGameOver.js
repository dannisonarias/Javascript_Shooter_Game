import Phaser from "phaser";
import ScrollingBackground from "./entityScrollingBackground";
import leaderBoard from "./leaderboard";
class SceneGameOver extends Phaser.Scene {
  constructor() {
    super({ key: "SceneGameOver" });
  }
  create() {
    // add for loop to create names for top 10 players.

    const createLeaderBoard = async () => {
      await leaderBoard.sendScore();
      this.add.text(this.game.config.width * 0.4, 150, "LEADERBOARD", 24);
      this.add.text(this.game.config.width * 0.25, 170, "RANK", 24);
      this.add.text(this.game.config.width * 0.45, 170, "NAME", 24);
      this.add.text(this.game.config.width * 0.65, 170, "SCORE", 24);
      let rankPosition = 190;
      let scores = await leaderBoard.allScores();
      let leaderBoards = scores.data.result.sort((a, b) => b.score - a.score);
      for (let i = 0; i < 10; i += 1) {
        let cscore = leaderBoards[i].score;
        let user = leaderBoards[i].user;
        this.add.text(this.game.config.width * 0.28, rankPosition, i + 1, 24);
        this.add.text(this.game.config.width * 0.45, rankPosition, user, 24);
        this.add.text(this.game.config.width * 0.65, rankPosition, cscore, 24);
        rankPosition += 20;
      }
    };

    createLeaderBoard();

    this.title = this.add.text(this.game.config.width * 0.5, 128, "GAME OVER", {
      fontFamily: "monospace",
      fontSize: 48,
      fontStyle: "bold",
      color: "#ffffff",
      align: "center",
    });
    this.title.setOrigin(0.5);

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

export default SceneGameOver;
