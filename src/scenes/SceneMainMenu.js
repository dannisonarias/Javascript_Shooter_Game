import Phaser from 'phaser';
import ScrollingBackground from './entityScrollingBackground';
import localScore from './localScore';
import api from './apiController';
import display from './domController';

class SceneMainMenu extends Phaser.Scene {
  constructor() {
    super({ key: 'SceneMainMenu' });
  }

  preload() {
    this.load.setBaseURL('./assets/');
    this.load.image('gameTitle', 'content/Title.png');
    this.load.image('alien', 'content/alien_94.png');
    this.load.image('sprBg0', 'content/sprBg0.png');
    this.load.image('sprBg1', 'content/sprBg1.png');
    this.load.image('sprBtnPlay', 'content/play_buttons.png');
    this.load.image('sprBtnPlayHover', 'content/play_button_pressed.png');
    this.load.image('sprBtnPlayDown', 'content/play_button_pressed.png');
    this.load.image('sprBtnRestart', 'content/exit_buttons.png');
    this.load.image('sprBtnRestartHover', 'content/exit_buttons_pressed.png');
    this.load.image('leaderBoard1', 'content/button_leader-board.png');
    this.load.image('leaderBoard2', 'content/button_leader-board2.png');
    this.load.image('sprBtnRestartDown', 'content/exit_buttons_pressed.png');
    this.load.audio('sndBtnOver', 'content/sndBtnOver.wav');
    this.load.audio('sndBtnDown', 'content/sndBtnDown.wav');
  }

  create() {
    // Controller instructions
    display.displayControls();
    // end
    // get leaderBoard to localStorage
    api.allScores();
    // end
    this.sfx = {
      btnOver: this.sound.add('sndBtnOver'),
      btnDown: this.sound.add('sndBtnDown'),
    };

    this.btnPlay = this.add.sprite(
      this.game.config.width * 0.5,
      this.game.config.height * 0.5,
      'sprBtnPlay',
    );

    this.alien = this.add
      .sprite(
        this.game.config.width * 0.55,
        this.game.config.height * 0.94,
        'alien',
      )
      .setScale(0.8);

    this.btnLeader = this.add.sprite(
      this.game.config.width * 0.5,
      this.game.config.height * 0.9,
      'leaderBoard1',
    );

    this.btnLeader.setInteractive();
    this.btnPlay.setInteractive();

    this.btnPlay.on(
      'pointerover',
      // eslint-disable-next-line
      function () {
        this.btnPlay.setTexture('sprBtnPlayHover'); // set the button texture to sprBtnPlayHover
        this.sfx.btnOver.play(); // play the button over sound
      },
      this,
    );

    this.btnLeader.on(
      'pointerover',
      // eslint-disable-next-line
      function () {
        this.btnLeader.setTexture('leaderBoard2'); // set the button texture to sprBtnPlayHover
        this.sfx.btnOver.play(); // play the button over sound
      },
      this,
    );
    // eslint-disable-next-line
    this.btnPlay.on("pointerout", function () {
      this.setTexture('sprBtnPlay');
    });
    // eslint-disable-next-line
    this.btnLeader.on("pointerout", function () {
      this.setTexture('leaderBoard1');
    });

    this.btnPlay.on(
      'pointerdown',
      // eslint-disable-next-line
      function () {
        this.btnPlay.setTexture('sprBtnPlayDown');
        this.sfx.btnDown.play();
      },
      this,
    );

    this.btnPlay.on(
      'pointerup',
      // eslint-disable-next-line
      function () {
        this.btnPlay.setTexture('sprBtnPlay');
        // reset and save username to local storage
        localStorage.clear();
        // hide user input field
        const user = document.getElementById('username');
        user.classList.add('hidden');
        // hide control settings
        display.offControl();
        // save input to localstorage
        if (user.value === '') {
          localScore.saveName('No Name');
        } else {
          localScore.saveName(user.value);
        }
        // start next Scene
        this.scene.start('SceneMain');
      },
      this,
    );

    this.btnLeader.on(
      'pointerdown',
      // eslint-disable-next-line
      function () {
        this.btnLeader.setTexture('leaderBoard1');
      },
      this,
    );

    this.btnLeader.on(
      'pointerup',
      () => {
        // start next Scene
        // hide user input field
        display.offControl();
        const user = document.getElementById('username');
        user.classList.add('hidden');
        this.scene.start('SceneLeaderBoard');
      },
      this,
    );

    this.add.sprite(
      this.game.config.width * 0.5,
      this.game.config.height * 0.2,
      'gameTitle',
    );

    const createScrollBg = () => {
      this.backgrounds = [];
      for (let i = 0; i < 5; i += 1) {
        const keys = ['sprBg0', 'sprBg1'];
        const key = keys[Phaser.Math.Between(0, keys.length - 1)];
        const bg = new ScrollingBackground(this, key, i * 10);
        this.backgrounds.push(bg);
      }
    };
    createScrollBg();
  }

  update() {
    // eslint-disable-next-line
    const backgrounds = (() => {
      for (let i = 0; i < this.backgrounds.length; i += 1) {
        this.backgrounds[i].update();
      }
    })();
  }
}

export default SceneMainMenu;
