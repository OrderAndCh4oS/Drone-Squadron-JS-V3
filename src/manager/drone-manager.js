import { returnToCanvas } from '../functions';

export default class DroneManager {
    constructor() {
        this.drones = [];
    }

    addDrone(drone) {
        this.drones.push(drone);
    }

    update() {
        this.drones = this.drones.map(d => {
            d.draw();
            d.update();
            returnToCanvas(d);
            return d;
        });
    }
}