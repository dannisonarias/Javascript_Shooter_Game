// import Phaser.Scene from "phaser" in node modules.
import { Scene } from 'phaser';

class StartGame extends Scene {
        constructor(){
        super('StartGame')
    }
preload ()
    {
    }
    create()
    {
        this.add.text(20,20,"hello world")
    }
}

export default StartGame