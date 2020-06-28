import CarrierShip from "./entityCarriership";
import GunnerShip from "./entityGunship";
import ChaserShip from "./entityChaserShip";
import "phaser";

const releaseEnemy = (() => {
  let enemy;
  const gunner = (scene) => {
    enemy = new GunnerShip(
      scene,
      Phaser.Math.Between(0, scene.game.config.width),
      0
    );
    enemy.setScale(Phaser.Math.Between(10, 20) * 0.005);
    return enemy;
  };
  const chaser = (scene) => {
    enemy = new ChaserShip(
      scene,
      Phaser.Math.Between(0, scene.game.config.width),
      0
    );
    // set enemy scale
    enemy.setScale(Phaser.Math.Between(10, 20) * 0.025);
    return enemy;
  };
  const carrier = (scene) => {
    enemy = new CarrierShip(
      scene,
      Phaser.Math.Between(0, scene.game.config.width),
      0
    );
    enemy.setScale(Phaser.Math.Between(10, 20) * 0.005);
    return enemy;
  };
  return { gunner, chaser, carrier };
})();

export default releaseEnemy;
