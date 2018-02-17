import Drone from '../drone';
import { canvasHeight, canvasWidth } from '../constants';

export default class DroneFactory {
    make(drone, squadron) {
        return new Drone(
            drone,
            squadron,
            Math.random() * canvasWidth,
            Math.random() * canvasHeight,
            0,
            Math.random() * Math.PI * 2,
        );
    }
}