import Bullet from '../abstract/bullet';

export default class Shot extends Bullet {
    constructor(drone, x, y, angle, velocity) {
        super(drone, x, y, 38, 0.5, angle, velocity, 1);
    }
}