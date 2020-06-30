import Phaser from 'phaser';
import ScrollingBackground from './entityScrollingBackground';
import api from './apiController';
import display from './domController';

class SceneGameOver extends Phaser.Scene {
  constructor() {
    super({ key: 'SceneGameOver' });
  }

  create() {
    // send score
    api.sendScore();
    // display user score
    this.add.text(
      this.game.config.width * 0.25,
      160,
      `YOUR SCORE:${parseInt(localStorage.score, 10)}`,
      {
        fontFamily: 'monospace',
        fontSize: 34,
        fontStyle: 'bold',
        color: '#ffffff',
        align: 'center',
      },
    );
    // end
    // reset and save username to local storage
    localStorage.clear();
    this.title = this.add.text(this.game.config.width * 0.5, 128, 'GAME OVER', {
      fontFamily: 'monospace',
      fontSize: 48,
      fontStyle: 'bold',
      color: '#ffffff',
      align: 'center',
    });
    this.title.setOrigin(0.5);

    this.sfx = {
      btnOver: this.sound.add('sndBtnOver'),
      btnDown: this.sound.add('sndBtnDown'),
    };

    this.btnRestart = this.add.sprite(
      this.game.config.width * 0.5,
      this.game.config.height * 0.8,
      'sprBtnRestart',
    );

    this.btnRestart.setInteractive();

    this.btnRestart.on(
      'pointerover',
      // eslint-disable-next-line
      function () {
        this.btnRestart.setTexture('sprBtnRestartHover'); // set the button texture to sprBtnPlayHover
        this.sfx.btnOver.play(); // play the button over sound
      },
      this,
    );
    // eslint-disable-next-line
    this.btnRestart.on("pointerout", function () {
      this.setTexture('sprBtnRestart');
    });

    this.btnRestart.on(
      'pointerdown',
      // eslint-disable-next-line
      function () {
        this.btnRestart.setTexture('sprBtnRestartDown');
        this.sfx.btnDown.play();
      },
      this,
    );

    this.btnRestart.on(
      'pointerup',
      // eslint-disable-next-line
      function () {
        display.onControl();
        this.btnRestart.setTexture('sprBtnRestart');
        const user = document.getElementById('username');
        user.classList.remove('hidden');
        this.scene.start('SceneMainMenu');
      },
      this,
    );

    this.backgrounds = [];
    for (let i = 0; i < 5; i += 1) {
      const keys = ['sprBg0', 'sprBg1'];
      const key = keys[Phaser.Math.Between(0, keys.length - 1)];
      const bg = new ScrollingBackground(this, key, i * 10);
      this.backgrounds.push(bg);
    }
  }

  update() {
    for (let i = 0; i < this.backgrounds.length; i += 1) {
      this.backgrounds[i].update();
    }
  }
}

export default SceneGameOver;
