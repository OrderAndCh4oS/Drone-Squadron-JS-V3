import Bullet from '../abstract/bullet';

export default class SevenSixTwoMM extends Bullet {
    constructor(id, x, y, angle, velocity) {
        super(id, x, y, 50, 2, angle, velocity, 17);
    }
}