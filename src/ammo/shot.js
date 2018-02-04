import Particle from '../abstract/particle';

export default class Shot extends Particle {
    constructor(x, y, angle, velocity) {
        super(x, y, 20, 0.5, angle);
        this.damage = 1;
        this.velocity.addTo(velocity);
    }
}