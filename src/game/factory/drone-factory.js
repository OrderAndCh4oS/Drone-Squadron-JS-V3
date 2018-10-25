import Drone from '../game-object/drone';
import { allDrones, dm } from '../constants/constants';
import canvas from '../service/canvas';
import Vector from '../service/vector';

export default class DroneFactory {
    static make(droneData, squadronData, utilities) {
        const weapon = utilities.weapons[droneData.weapon_name].make();
        weapon.attachGimbal(utilities.gimbals[droneData.gimbal_name].make());
        const thruster = utilities.thrusters[droneData.thruster_name].make();
        const steering = utilities.steering[droneData.steering_name].make();
        const scanner = utilities.scanners[droneData.scanner_name].make();
        let position = new Vector(
            Math.random() * canvas.width,
            Math.random() * canvas.height,
        );
        const drone = new Drone(
            droneData,
            squadronData,
            weapon,
            thruster,
            steering,
            scanner,
            position.x,
            position.y,
            Math.random() * Math.PI * 2,
        );
        weapon.attachDrone(drone);
        weapon.setPosition(position.x, position.y);
        dm.addDrone(drone);

        return drone;
    }
}
