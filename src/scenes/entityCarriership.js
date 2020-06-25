import Entity from "./Entities";
class CarrierShip extends Entity {
  constructor(scene, x, y) {
    super(scene, x, y, "sprEnemy2", "CarrierShip");
    this.play("sprEnemy2");

    this.body.velocity.y = Phaser.Math.Between(200, 500);
  }
}
export default CarrierShip;
