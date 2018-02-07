import { angleTo, distanceTo } from '../functions';

export default class Thruster {
    constructor(thrust) {
        this.thrust = thrust;
    }

    setPower(drone) {
        this.drone = drone;
        if(drone.scanner.hasTarget() &&
            distanceTo(drone, drone.scanner.target) < 30 &&
            this.angleBetweenRange(drone, 0.4)) {
            this.stopThrusting();
            return;
        }
        if(drone.scanner.hasTarget() &&
            distanceTo(drone, drone.scanner.target) < 300 &&
            !this.angleBetweenRange(drone, 0.7)) {
            this.startThrusting(1);
            return;
        }
        if(this.angleBetweenRange(drone, 0.6)) {
            this.startThrusting(0.5);
        } else if(this.angleBetweenRange(drone, 0.3)) {
            this.startThrusting(0.8);
        } else if(this.angleBetweenRange(drone, 0.2)) {
            this.startThrusting(1);
        } else {
            this.startThrusting(0.7);
        }
    }

    angleBetweenRange(drone, range) {
        return angleTo(drone.angle, drone.scanner.angleToTarget()) <= range /
            2 &&
            angleTo(drone.angle, drone.scanner.angleToTarget()) >= -(range / 2);
    }

    startThrusting(power) {
        this.drone.velocity.setLength(this.thrust * power);
    }

    stopThrusting() {
        this.thrustPower = 0;
    }

    isThrusting() {
        return this.thrusterPower > 0;
    }
}