import Particle from './particle';

export default class Bullet extends Particle {
    constructor(id, x, y, speed, radius, angle, velocity, damage) {
        super(id, x, y, speed, radius, angle);
        this._damage = damage;
        this.velocity.addTo(velocity);
    }

    get damage() {
        return this._damage;
    }
}
