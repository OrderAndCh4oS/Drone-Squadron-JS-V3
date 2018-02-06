import Bullet from '../abstract/bullet';

export default class Shot extends Bullet {
    constructor(id, x, y, angle, velocity) {
        super(id, x, y, 40, 0.5, angle, velocity, 1);
    }
}