import Particle from '../abstract/particle';

export default class NineMM extends Particle {
    constructor(x, y, angle, velocity) {
        super(x, y, 30, 1, angle);
        this.damage = 1;
        this.velocity.addTo(velocity);
    }
}