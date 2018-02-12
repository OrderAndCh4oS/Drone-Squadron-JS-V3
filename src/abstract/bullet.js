import Particle from './particle';

export default class Bullet extends Particle {
    constructor(id, squadId, x, y, speed, radius, angle, velocity, damage) {
        super(id, x, y, speed, radius, angle);
        this._squadId = squadId;
        this._damage = damage;
        this.velocity.addTo(velocity);
    }

    get squadId() {
        return this._squadId;
    }

    get damage() {
        return this._damage;
    }
}
