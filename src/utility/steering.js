import { angleBetweenRange, angleTo, distanceTo } from '../functions';

export default class Steering {
    constructor(turningSpeed) {
        this.turningSpeed = turningSpeed;
        this.turnAmount = 0;
        this.roaming = {callback: null, count: 0};
        this.evading = {callback: null, count: 0};
    }

    turn(drone) {
        this.drone = drone;
        if(!drone.scanner.hasTarget()) {
            this.roam();
            return;
        }
        if(drone.scanner.hasTarget() &&
            distanceTo(drone, drone.scanner.target) < 100 &&
            !angleBetweenRange(drone, Math.PI / 2)) {
            this.evade();
            return;
        }
        const angleToTarget = angleTo(drone.angle,
            drone.scanner.angleToTarget());
        switch(true) {
            case (angleToTarget >= 0.6):
                this.turnAmount = this.turningSpeed * 0.1;
                this.turnLeft();
                break;
            case (angleToTarget >= 0.4):
                this.turnAmount = this.turningSpeed * 0.066;
                this.turnLeft();
                break;
            case (angleToTarget >= 0.2):
                this.turnAmount = this.turningSpeed * 0.033;
                this.turnLeft();
                break;
            case (angleToTarget > 0):
                this.turnLeft(
                    angleToTarget);
                break;
            case (angleToTarget <= -0.6):
                this.turnAmount = this.turningSpeed * 0.1;
                this.turnRight();
                break;
            case (angleToTarget <= -0.4):
                this.turnAmount = this.turningSpeed * 0.066;
                this.turnRight();
                break;
            case (angleToTarget <= -0.2):
                this.turnAmount = this.turningSpeed * 0.033;
                this.turnRight();
                break;
            case (angleToTarget < 0):
                this.turnRight(
                    angleToTarget);
                break;
        }
    }

    turnLeft() {
        this.incrementAngle(-this.turnAmount);
    }

    turnRight() {
        this.incrementAngle(this.turnAmount);
    }

    incrementAngle(increment) {
        this.drone.angle += increment;
    }

    roam() {
        if(this.roaming.count > 0) {
            this.turnAmount = this.turningSpeed * 0.033;
            this.roaming.callback();
            this.roaming.count--;
        } else {
            this.roaming.count = Math.floor(Math.random() * 60 + 20);
            this.roaming.callback = Math.random() > 0.5 ? this.turnRight.bind(
                this) : this.turnLeft.bind(this);
        }
    }

    evade() {
        if(this.evading.count > 0) {
            this.turnAmount = this.turningSpeed * 0.1;
            this.evading.callback();
            this.evading.count--;
        } else {
            this.evading.count = Math.floor(Math.random() * 20 + 5);
            this.evading.callback = Math.random() > 0.5 ? this.turnRight.bind(
                this) : this.turnLeft.bind(this);
        }
    }
}