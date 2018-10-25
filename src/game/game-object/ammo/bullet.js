import Particle from '../abstract/particle';

export default class Bullet extends Particle {
    constructor(drone, x, y, angle, velocity, speed, radius, damage, colour) {
        super(drone.id, x, y, speed, radius, angle);
        this._drone = drone;
        this._damage = damage;
        this._colour = colour;
        this.velocity.addTo(velocity);
    }

    get colour() {
        return this._colour;
    }

    get squadId() {
        return this._drone.squadId;
    }

    get damage() {
        return this._damage;
    }

    tallyKill(killedDrone) {
        this._drone.updateKills(killedDrone);
    }

    tallyDamage(damage) {
        this._drone.updateDamage(damage);
    }
}
