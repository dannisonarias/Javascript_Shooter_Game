import Entity from './Entities';

class EnemyLaser extends Entity {
  constructor(scene, x, y) {
    super(scene, x, y, 'sprLaserEnemy0');
    this.body.velocity.y = 550;
  }
}

export default EnemyLaser;
