import Bullet from '../abstract/bullet';

export default class Shot extends Bullet {
    constructor(id, squadId, x, y, angle, velocity) {
        super(id, squadId, x, y, 38, 0.5, angle, velocity, 1);
    }
}