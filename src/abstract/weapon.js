import { context, pm } from '../constants';
import { deltaTime } from '../service/delta-time';
import Vector from '../service/vector';
import { angleTo } from '../functions';

export default class Weapon {
    constructor(id, squadId, color, x, y, angle, gimbal, round, fireRate) {
        this.id = id;
        this.squadId = squadId;
        this.color = color;
        this.position = new Vector(x, y);
        this.velocity = 0;
        this.fireRate = fireRate;
        this.lastFired = 0;
        this.gimbal = new gimbal();
        this.round = round;
    }

    draw() {
        context.translate(this.position.x, this.position.y);
        context.rotate(this.gimbal.vector.getAngle() + this.droneAngle);
        context.beginPath();
        context.lineTo(10, -2);
        context.lineTo(10, 2);
        context.lineTo(0, 2);
        context.lineTo(0, -2);
        context.strokeStyle = this.color;
        context.stroke();
        context.fillStyle = this.color;
        context.fill();
        context.resetTransform();
    }

    update(drone) {
        this.position.x = drone.position.x;
        this.position.y = drone.position.y;
        this.velocity = drone.velocity;
        this.droneAngle = drone.vector.getAngle();
        this.gimbal.trackTarget(drone);
        const angleToTarget = angleTo(drone.angle,
            drone.scanner.angleToTarget());
        if(
            drone.scanner.hasTarget() &&
            angleToTarget <= this.gimbal.angleLimit &&
            angleToTarget >= -this.gimbal.angleLimit
        ) {
            this.fireIfReady();
        }
    }

    fireIfReady() {
        if((deltaTime.getElapsedTime() - this.lastFired) > this.fireRate) {
            this.fire();
            this.lastFired = deltaTime.getElapsedTime();
        }
    }

    fire() {
        pm.addParticle(
            new this.round(
                this.id,
                this.squadId,
                this.position.x,
                this.position.y,
                this.gimbal.vector.getAngle() + this.droneAngle,
                this.velocity,
            ),
        );
    }

    applyFill() {
        context.fillStyle = this.color;
        context.fill();
    }

    applyStroke() {
        context.strokeStyle = this.color;
        context.stroke();
    }
}
