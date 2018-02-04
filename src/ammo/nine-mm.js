import Particle from '../particle';

export default class NineMM extends Particle {
    constructor(x, y, angle, velocity) {
        super(x, y, 30, 1, angle);
        this.damage = 2;
        this.velocity.addTo(velocity);
    }
}