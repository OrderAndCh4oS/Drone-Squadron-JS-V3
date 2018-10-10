import Drone from '../drone';
import { allDrones, dm } from '../constants/constants';
import canvas from '../service/canvas';

export default class DroneFactory {
    static make(droneData, squadronData) {
        const drone = new Drone(
            droneData,
            squadronData,
            Math.random() * canvas.width,
            Math.random() * canvas.height,
            Math.random() * Math.PI * 2,
        );
        dm.addDrone(drone);
        return drone;
    }
}
