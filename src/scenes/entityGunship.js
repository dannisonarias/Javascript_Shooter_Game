import Entity from "./Entities";
import EnemyLaser from "./entityEnemyLaser";

class GunnerShip extends Entity {
  constructor(scene, x, y) {
    super(scene, x, y, "sprEnemy0", "GunShip");

    this.body.velocity.y = Phaser.Math.Between(200, 450);
  }

  onDestroy() {
    if (this.shootTimer !== undefined) {
      if (this.shootTimer) {
        this.shootTimer.remove(false);
      }
    }
  }
}

export default GunnerShip;
