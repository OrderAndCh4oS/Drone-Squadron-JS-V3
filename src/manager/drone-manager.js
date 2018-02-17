import { returnToCanvas } from '../functions';
import Explosion from '../abstract/explosion';
import { pm } from '../constants';

export default class DroneManager {
    constructor() {
        this._drones = [];
    }

    get drones() {
        return this._drones;
    }

    addDrone(drone) {
        this._drones.push(drone);
    }

    update() {
        this._drones = this._drones.map(d => {
            d.draw();
            d.update();
            returnToCanvas(d);
            if(d.health.currentHealth <= 0) {
                const explosion = new Explosion(-1, d.position.x, d.position.y);
                pm.addParticle(explosion);
                d.removeParticle();
            }
            return d;
        }).filter((d) => d.health.currentHealth > 0);
    }
}