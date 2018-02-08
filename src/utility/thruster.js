import { angleBetweenRange, distanceTo } from '../functions';

export default class Thruster {
    constructor(thrust) {
        this.thrust = thrust;
    }

    setPower(drone) {
        this.drone = drone;
        let power = 1;
        switch(true) {
            case this.targetIsTooClose(drone):
                this.stopThrusting();
                break;
            case this.targetIsBehind(drone):
                this.startThrusting(1);
                break;
            case drone.scanner.hasTarget() &&
            angleBetweenRange(drone.angle, drone.scanner.angleToTarget(),
                0.2):
                power = this.getPowerFromDistance(drone);
                this.startThrusting(power);
                break;
            case drone.scanner.hasTarget() &&
            angleBetweenRange(drone.angle, drone.scanner.angleToTarget(),
                0.3):
                power = this.getPowerFromDistance(drone);
                this.startThrusting(0.8 * power);
                break;
            case drone.scanner.hasTarget() &&
            angleBetweenRange(drone.angle, drone.scanner.angleToTarget(),
                0.6):
                this.startThrusting(0.4);
                break;
            default:
                this.startThrusting(0.5);

        }
    }

    targetIsBehind(drone) {
        return drone.scanner.hasTarget() &&
            distanceTo(drone, drone.scanner.target) < 300 &&
            !angleBetweenRange(drone, Math.PI / 2);
    }

    targetIsTooClose(drone) {
        return drone.scanner.hasTarget() &&
            distanceTo(drone, drone.scanner.target) < 30 &&
            angleBetweenRange(drone, 0.6);
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

    getPowerFromDistance(drone) {
        switch(true) {
            case distanceTo(drone, drone.scanner.target) > 800:
                return 1;
            case distanceTo(drone, drone.scanner.target) > 600:
                return 0.8;
            case distanceTo(drone, drone.scanner.target) > 300:
                return 0.6;
            case distanceTo(drone, drone.scanner.target) > 200:
                return 0.4;
            case distanceTo(drone, drone.scanner.target) > 100:
                return 0.2;
        }
    }
}