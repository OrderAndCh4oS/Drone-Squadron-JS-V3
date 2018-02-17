import Drone from '../drone';
import { allDrones, canvasHeight, canvasWidth } from '../constants';

export default class DroneFactory {
    static make(droneData, squadronData) {
        const drone = new Drone(
            droneData,
            squadronData,
            Math.random() * canvasWidth,
            Math.random() * canvasHeight,
            0,
            Math.random() * Math.PI * 2,
        );
        allDrones.push(drone);
        return drone
    }
}