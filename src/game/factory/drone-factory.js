import Drone from '../drone';
import {
    allDrones,
    canvasHeight,
    canvasWidth,
    dm,
} from '../constants/constants';

export default class DroneFactory {
    static make(droneData, squadronData) {
        const drone = new Drone(
            droneData,
            squadronData,
            Math.random() * canvasWidth,
            Math.random() * canvasHeight,
            Math.random() * Math.PI * 2,
        );
        dm.addDrone(drone);
        return drone;
    }
}