import Weapon from './weapon';
import Bullet from './bullet';

export default class Uzi extends Weapon {
    constructor(x, y, angle, gimbal) {
        const fireRate = 1;
        const round = Bullet;
        super(x, y, angle, gimbal, round, fireRate);
    }
}