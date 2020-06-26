import "phaser";
import ScrollingBackground from "./entityScrollingBackground";
import Player from "./entityPlayer";
import CarrierShip from "./entityCarriership";
import GunnerShip from "./entityGunship";
import ChaserShip from "./entityChaserShip";
import Timer from "./timer.js";
import Leaderboard from "./leaderboard";
import localScore from "./localScore";

class SceneMain extends Phaser.Scene {
  constructor() {
    super({ key: "SceneMain" });
  }

  preload() {
    this.load.spritesheet("sprExplosion", "assets/content/sprExplosion.png", {
      frameWidth: 32,
      frameHeight: 32,
    });
    this.load.image("sprEnemy0", "assets/content/sprEnemy0.png");
    this.load.image("sprEnemy1", "assets/content/space_mine.png");
    this.load.image("sprEnemy2", "assets/content/sprEnemy2.png");

    this.load.image("sprLaserEnemy0", "assets/content/sprLaserEnemy0.png");
    this.load.image("sprLaserPlayer", "assets/images/bullet.png");
    this.load.image("ship1", "assets/images/1.png");
    this.load.image("ship2", "assets/images/2.png");
    this.load.image("ship3", "assets/images/3.png");
    this.load.image("ship4", "assets/images/4.png");
    this.load.image("ship5", "assets/images/5.png");

    this.load.audio("sndExplode0", "assets/content/sndExplode0.wav");
    this.load.audio("sndExplode1", "assets/content/sndExplode1.wav");
    this.load.audio("sndLaser", "assets/content/laser5.mp3");
  }

  create() {
    // Explotion animation
    this.anims.create({
      key: "sprExplosion",
      frames: this.anims.generateFrameNumbers("sprExplosion"),
      frameRate: 20,
      repeat: 0,
    });
    // end

    // animate spaceship
    this.anims.create({
      key: "shipanim",
      frames: [
        { key: "ship1" },
        { key: "ship2" },
        { key: "ship3" },
        { key: "ship4" },
        { key: "ship5", duration: 50 },
      ],
      frameRate: 8,
      repeat: -1,
    });
    // end

    this.sfx = {
      explosions: [
        this.sound.add("sndExplode0"),
        this.sound.add("sndExplode1"),
      ],
      laser: this.sound.add("sndLaser"),
    };

    // create scrolling background
    this.backgrounds = [];
    for (var i = 0; i < 5; i++) {
      var bg = new ScrollingBackground(this, "sprBg0", i * 10);
      this.backgrounds.push(bg);
    }
    // end

    // create player sprite
    this.player = new Player(
      this,
      this.game.config.width * 0.5,
      this.game.config.height * 0.9,
      "ship1"
    )
      .setScale(0.1)
      .play("shipanim");
    // end

    // add main keys
    const createControlKeys = (() => {
      this.keyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
      this.keyS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
      this.keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
      this.keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
      this.keySpace = this.input.keyboard.addKey(
        Phaser.Input.Keyboard.KeyCodes.SPACE
      );
    })();

    // end

    // group
    this.enemies = this.add.group();
    this.enemyLasers = this.add.group();
    this.playerLasers = this.add.group();
    // end

    localStorage.clear();

    // release enemies
    Timer.createTimer(this);
    this.delayLevel = 380;

    // Add Enemies
    this.time.addEvent({
      delay: this.delayLevel,
      callback: function () {
        let enemy = null;
        if (Phaser.Math.Between(0, 10) >= 3) {
          enemy = new GunnerShip(
            this,
            Phaser.Math.Between(0, this.game.config.width),
            0
          );
          enemy.setScale(Phaser.Math.Between(10, 20) * 0.005);
        } else if (Phaser.Math.Between(0, 10) >= 5) {
          if (this.getEnemiesByType("ChaserShip").length < 5) {
            enemy = new ChaserShip(
              this,
              Phaser.Math.Between(0, this.game.config.width),
              0
            );
            // set enemy scale
            enemy.setScale(Phaser.Math.Between(10, 20) * 0.025);
          }
        } else {
          enemy = new CarrierShip(
            this,
            Phaser.Math.Between(0, this.game.config.width),
            0
          );
          enemy.setScale(Phaser.Math.Between(10, 20) * 0.005);
        }

        if (enemy !== null) {
          this.enemies.add(enemy);
        }
      },
      callbackScope: this,
      loop: true,
    });
    // end

    this.physics.add.collider(this.playerLasers, this.enemies, function (
      playerLaser,
      enemy
    ) {
      if (enemy) {
        if (enemy.onDestroy !== undefined) {
          enemy.onDestroy();
        }
        enemy.explode(true);
        playerLaser.destroy();
      }
    });

    this.physics.add.overlap(this.player, this.enemies, function (
      player,
      enemy
    ) {
      if (!player.getData("isDead") && !enemy.getData("isDead")) {
        player.explode(false);
        player.onDestroy();
        enemy.explode(true);
      }
    });

    this.physics.add.overlap(this.player, this.enemyLasers, function (
      player,
      laser
    ) {
      if (!player.getData("isDead") && !laser.getData("isDead")) {
        player.explode(false);
        player.onDestroy();
        laser.destroy();
      }
    });
  }
  // Create End
  getEnemiesByType(type) {
    var arr = [];
    for (var i = 0; i < this.enemies.getChildren().length; i++) {
      var enemy = this.enemies.getChildren()[i];
      if (enemy.getData("type") == type) {
        arr.push(enemy);
      }
    }
    return arr;
  }

  update() {
    Timer.updateText(this);
    // speed up the enemies creation using timer
    this.time._active[0].delay -= 0.05;
    // end

    // store score in localStorage
    if (this.player.getData("isDead")) {
      localScore.saveScore(this);
    }
    //
    if (!this.player.getData("isDead")) {
      this.player.update();
      if (this.keyW.isDown) {
        this.player.moveUp();
      } else if (this.keyS.isDown) {
        this.player.moveDown();
      }
      if (this.keyA.isDown) {
        this.player.moveLeft();
      } else if (this.keyD.isDown) {
        this.player.moveRight();
      }

      if (this.keySpace.isDown) {
        this.player.setData("isShooting", true);
      } else {
        this.player.setData(
          "timerShootTick",
          this.player.getData("timerShootDelay") - 1
        );
        this.player.setData("isShooting", false);
      }
    }

    for (var i = 0; i < this.enemies.getChildren().length; i++) {
      var enemy = this.enemies.getChildren()[i];

      enemy.update();

      if (
        enemy.x < -enemy.displayWidth ||
        enemy.x > this.game.config.width + enemy.displayWidth ||
        enemy.y < -enemy.displayHeight * 4 ||
        enemy.y > this.game.config.height + enemy.displayHeight
      ) {
        if (enemy) {
          if (enemy.onDestroy !== undefined) {
            enemy.onDestroy();
          }
          enemy.destroy();
        }
      }
    }

    for (var i = 0; i < this.enemyLasers.getChildren().length; i++) {
      var laser = this.enemyLasers.getChildren()[i];
      laser.update();
      if (
        laser.x < -laser.displayWidth ||
        laser.x > this.game.config.width + laser.displayWidth ||
        laser.y < -laser.displayHeight * 4 ||
        laser.y > this.game.config.height + laser.displayHeight
      ) {
        if (laser) {
          laser.destroy();
        }
      }
    }

    for (var i = 0; i < this.playerLasers.getChildren().length; i++) {
      var laser = this.playerLasers.getChildren()[i];
      laser.update();
      if (
        laser.x < -laser.displayWidth ||
        laser.x > this.game.config.width + laser.displayWidth ||
        laser.y < -laser.displayHeight * 4 ||
        laser.y > this.game.config.height + laser.displayHeight
      ) {
        if (laser) {
          laser.destroy();
        }
      }
    }

    for (var i = 0; i < this.backgrounds.length; i++) {
      this.backgrounds[i].update();
    }
  }
}

export default SceneMain;
