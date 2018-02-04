import { isOffCanvas } from '../functions';

export default class DroneManager {
    constructor() {
        this.drones = [];
    }

    addDrone(drone) {
        this.drones.push(drone);
    }

    update() {
        this.drones = this.drones
            .map(p => {
                p.draw();
                p.update();
                return p;
            })
            .filter(p => !isOffCanvas(p));
    }
}