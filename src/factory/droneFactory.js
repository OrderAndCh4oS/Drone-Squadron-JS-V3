import Drone from '../drone';
import { weapons } from '../constants/weapons';
import { gimbals, scanners, steering, thrusters } from '../constants/utilities';
import { canvasHeight, canvasWidth } from '../constants';

export default class DroneFactory {
    make(drone, squadron) {
        return new Drone(
            drone.id,
            squadron.id,
            drone.name,
            squadron.colour,
            Math.random() * canvasWidth,
            Math.random() * canvasHeight,
            0,
            Math.random() * Math.PI * 2,
            weapons[drone.weapon],
            gimbals[drone.gimbal],
            scanners[drone.scanner],
            thrusters[drone.thruster],
            steering[drone.steering],
        );
    }
}