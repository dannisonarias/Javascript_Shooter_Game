// import Phaser.Scene from "phaser" in node modules.
import { Scene } from 'phaser';

class StartMenu extends Scene {
    constructor(){
        super('StartMenu')
    }
preload ()
    {
        this.load.setBaseURL('./assets/');
        this.load.audio('spaceMenu', 'sounds/spaceMenu.mp3');
        this.load.image('background', 'images/startMenu.jpg');
        this.load.image('play', 'images/Play.png')
    }
    create()
    {
        this.add.image(400, 300, 'background');
        this.add.image(400, 300,'play');
        let sfx = this.sound.add('spaceMenu')
        sfx.play();
        this.input.on('pointerdown',()=> this.scene.start('StartGame'))
    }
}

export default StartMenu