import { context, pm } from '../constants';
import { deltaTime } from '../service/delta-time';
import Vector from '../service/vector';

export default class Weapon {
    constructor(id, color, x, y, angle, gimbal, round, fireRate) {
        this.id = id;
        this.color = color;
        this.position = new Vector(x, y);
        this.velocity = 0;
        this.fireRate = fireRate;
        this.lastFired = 0;
        this.gimbal = gimbal;
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

    update(position, vector, velocity, scanner) {
        this.position.x = position.x;
        this.position.y = position.y;
        this.velocity = velocity;
        this.droneAngle = vector.getAngle();
        this.gimbal.update();
        if(scanner.hasTarget() && scanner.angleToTarget() > -0.4 && scanner.angleToTarget() < 0.4) {
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
