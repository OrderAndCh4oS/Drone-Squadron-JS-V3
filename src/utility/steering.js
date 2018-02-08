import { angleBetweenRange, angleTo, distanceTo } from '../functions';

export default class Steering {
    constructor(turningSpeed) {
        this.turningSpeed = turningSpeed;
        this.roaming = {callback: null, count: 0};
        this.evading = {callback: null, count: 0};
    }

    turn(drone) {
        this.drone = drone;
        if(!drone.scanner.hasTarget()) {
            this.roam();
        }
        if(drone.scanner.hasTarget() &&
            distanceTo(drone, drone.scanner.target) < 100 &&
            !angleBetweenRange(drone, Math.PI / 2)) {
            this.evade();
            return;
        }
        switch(true) {
            case (angleTo(drone.angle, drone.scanner.angleToTarget()) >= 0.6):
                this.turnLeft(this.turningSpeed * 0.1);
                break;
            case (angleTo(drone.angle, drone.scanner.angleToTarget()) >= 0.4):
                this.turnLeft(this.turningSpeed * 0.1 / 3 * 2);
                break;
            case (angleTo(drone.angle, drone.scanner.angleToTarget()) >= 0.2):
                this.turnLeft(this.turningSpeed * 0.1 / 3);
                break;
            case (angleTo(drone.angle, drone.scanner.angleToTarget()) > 0):
                this.turnLeft(
                    angleTo(drone.angle, drone.scanner.angleToTarget()));
                break;
            case (angleTo(drone.angle, drone.scanner.angleToTarget()) <= -0.6):
                this.turnRight(this.turningSpeed * 0.1);
                break;
            case (angleTo(drone.angle, drone.scanner.angleToTarget()) <= -0.4):
                this.turnRight(this.turningSpeed * 0.1 / 3 * 2);
                break;
            case (angleTo(drone.angle, drone.scanner.angleToTarget()) <= -0.2):
                this.turnRight(this.turningSpeed * 0.1 / 3);
                break;
            case (angleTo(drone.angle, drone.scanner.angleToTarget()) < 0):
                this.turnRight(
                    angleTo(drone.angle, drone.scanner.angleToTarget()));
                break;
        }
    }

    turnLeft(turnSpeed) {
        let turn = turnSpeed * this.turningSpeed;
        this.incrementAngle(-turn);
    }

    turnRight(turnSpeed) {
        const turn = turnSpeed * this.turningSpeed;
        this.incrementAngle(turn);
    }

    incrementAngle(increment) {
        this.drone.angle += increment;
    }

    roam() {
        if(this.roaming.count > 0) {
            this.roaming.callback(0.1);
            this.roaming.count--;
        } else {
            this.roaming.count = Math.floor(Math.random() * 60 + 20);
            this.roaming.callback = Math.random() > 0.5 ? this.turnRight.bind(
                this) : this.turnLeft.bind(this);
        }
    }

    evade() {
        if(this.evading.count > 0) {
            this.evading.callback(0.13);
            this.evading.count--;
        } else {
            this.evading.count = Math.floor(Math.random() * 20 + 5);
            this.evading.callback = Math.random() > 0.5 ? this.turnRight.bind(
                this) : this.turnLeft.bind(this);
        }
    }
}