import Bullet from './bullet';
import { context, pm } from '../constants';
import { deltaTime } from '../delta-time';
import Vector from '../vector';

export default class Weapon {
    constructor(x, y, angle, velocity, fireRate, gimbal) {
        this.position = new Vector(x, y);
        this.velocity = velocity;
        this.fireRate = fireRate;
        this.lastFired = 0;
        this.gimbal = gimbal;
    }

    draw() {
        context.translate(this.position.x, this.position.y);
        context.rotate(this.gimbal.vector.getAngle() + this.droneAngle);
        context.beginPath();
        context.lineTo(10, -2);
        context.lineTo(10, 2);
        context.lineTo(0, 2);
        context.lineTo(0, -2);
        context.strokeStyle = '#000';
        context.stroke();
        context.fillStyle = '#000';
        context.fill();
        context.resetTransform();
    }

    update(position, vector, velocity) {
        this.position.x = position.x;
        this.position.y = position.y;
        this.velocity = velocity;
        this.droneAngle = vector.getAngle();
        this.gimbal.update();
        this.fireIfReady();
    }

    fireIfReady() {
        if((deltaTime.getElapsedTime() - this.lastFired) > this.fireRate) {
            this.fire();
            this.lastFired = deltaTime.getElapsedTime();
        }
    }

    fire() {
        const bullet = new Bullet(
            this.position.x,
            this.position.y,
            this.gimbal.vector.getAngle() + this.droneAngle,
            this.velocity,
        );

        pm.addParticle(bullet);
    }
}
