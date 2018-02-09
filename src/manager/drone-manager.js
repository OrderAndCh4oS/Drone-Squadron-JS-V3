import { returnToCanvas } from '../functions';

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
            return d;
        }).filter((d) => d.health > 0);
    }
}