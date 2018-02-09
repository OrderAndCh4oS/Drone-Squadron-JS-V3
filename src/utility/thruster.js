import { angleBetweenRange, distanceTo } from '../functions';
import { colours, context } from '../constants';

export default class Thruster {
    constructor(thrust) {
        this.thrust = thrust;
        this.roaming = {callback: null, count: 0};
    }

    setPower(drone) {
        this.drone = drone;
        this.power = 1;
        switch(true) {
            case this.targetIsTooClose(drone):
                this.stopThrusting();
                break;
            case this.targetIsCloseBehind(drone):
                this.startThrusting(1);
                break;
            case drone.scanner.hasTarget() &&
            angleBetweenRange(drone.angle, drone.scanner.angleToTarget(),
                0.2):
                this.power = this.getPowerFromDistance(drone);
                this.startThrusting(this.power);
                break;
            case drone.scanner.hasTarget() &&
            angleBetweenRange(drone.angle, drone.scanner.angleToTarget(),
                0.3):
                this.power = 0.8 * this.getPowerFromDistance(drone);
                this.startThrusting();
                break;
            case drone.scanner.hasTarget() &&
            angleBetweenRange(drone.angle, drone.scanner.angleToTarget(),
                0.6):
                this.power = 0.4;
                this.startThrusting();
                break;
            default:
                this.power = 0.5;
                this.startThrusting();

        }
    }

    startThrusting() {

        this.drone.velocity.setLength(this.thrust * this.power);
    }

    stopThrusting() {
        this.power = 0;
    }

    isThrusting() {
        return this.power > 0;
    }

    draw(drone) {
        if(this.isThrusting()) {
            context.translate(drone.position.x, drone.position.y);
            context.rotate(drone.vector.getAngle());
            context.beginPath();
            context.moveTo(-10, -2);
            context.lineTo(-15, -3);
            context.lineTo(-12, -1);
            context.lineTo(-17, 0);
            context.lineTo(-13, 1);
            context.lineTo(-15, 3);
            context.lineTo(-10, 2);
            context.strokeWidth = 0.25;
            context.strokeStyle = drone._color;
            context.stroke();
            context.fillStyle = colours.orange;
            context.fill();
            context.resetTransform();
        }
    }

    targetIsCloseBehind() {
        return this.drone.scanner.hasTarget() &&
            distanceTo(this.drone, this.drone.scanner.target) < 300 &&
            this.targetIsBehind(this.drone);
    }

    targetIsTooClose() {
        return this.drone.scanner.hasTarget() &&
            distanceTo(this.drone, this.drone.scanner.target) < 30 &&
            angleBetweenRange(this.drone, 0.6);
    }

    getPowerFromDistance(drone) {
        switch(true) {
            case distanceTo(drone, drone.scanner.target) > 800:
                return this.targetIsAhead(drone) ? 1 : 0;
            case distanceTo(drone, drone.scanner.target) > 600:
                return this.targetIsAhead(drone) ? 0.8 : 0.2;
            case distanceTo(drone, drone.scanner.target) > 300:
                return this.targetIsAhead(drone) ? 0.6 : 0.4;
            case distanceTo(drone, drone.scanner.target) > 200:
                return this.targetIsAhead(drone) ? 0.4 : 0.6;
            case distanceTo(drone, drone.scanner.target) > 100:
                return this.targetIsAhead(drone) ? 0.2 : 0.8;
            default:
                return this.targetIsAhead(drone) ? 0.1 : 0.9;
        }
    }

    targetIsAhead(target) {
        return angleBetweenRange(target, Math.PI / 2);
    }

    targetIsBehind(target) {
        return !angleBetweenRange(target, Math.PI / 2);
    }
}