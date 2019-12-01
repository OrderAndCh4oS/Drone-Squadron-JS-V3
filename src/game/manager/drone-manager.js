import { returnToCanvas, shuffle } from '../functions';
import Explosion from '../game-object/abstract/explosion';
import { particleManager } from '../constants/constants';

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

    reset() {
        this._drones = [];
    }

    update() {
        this._drones = shuffle(this._drones);
        this._drones = this._drones.map(drone => {
            drone.draw();
            drone.update();
            returnToCanvas(drone);
            if(drone.health.currentHealth <= 0) {
                const explosion = new Explosion(-1, drone.position.x,
                    drone.position.y);
                particleManager.addParticle(explosion);
                drone.removeParticle();
            }
            return drone;
        }).filter((drone) => drone.health.currentHealth > 0);
    }
}
