import Particle from './particle';

export default class Bullet extends Particle {
    constructor(x, y, angle, velocity) {
        super(x, y, 30, 2, angle);
        this.velocity.addTo(velocity);
    }
}