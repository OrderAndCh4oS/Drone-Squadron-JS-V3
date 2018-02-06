import Bullet from '../abstract/bullet';

export default class NineMM extends Bullet {
    constructor(id, x, y, angle, velocity) {
        super(id, x, y, 45, 1, angle, velocity, 2);
    }
}