import Bullet from './bullet';
import { context, pm } from './constants';
import { deltaTime } from './delta-time';
import Vector from './vector';

export default class Weapon {
    constructor(x, y, angle, fireRate, angleLimit, turningSpeed) {
        this.position = new Vector(x, y);
        this.vector = new Vector(x, y);
        this.vector.setAngle(angle);
        this.velocity = new Vector(10, 0);
        this.fireRate = fireRate;
        this.lastFired = 0;
        this.rotation = 'right';
        this.angleLimit = angleLimit;
        this.turningSpeed = turningSpeed;
    }

    draw() {
        context.translate(this.position.x, this.position.y);
        context.rotate(this.vector.getAngle());
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

    turn() {
        switch(true) {
            case this.rotation === 'right' &&
            this.vector.getAngle() < this.angleLimit:
                this.vector.setAngle(this.vector.getAngle() +
                    this.turningSpeed);
                break;
            case this.rotation === 'left' &&
            this.vector.getAngle() > -this.angleLimit:
                this.vector.setAngle(this.vector.getAngle() -
                    this.turningSpeed);
                break;
            case this.rotation === 'right' &&
            this.vector.getAngle() > this.angleLimit:
                this.rotation = 'left';
                break;
            case this.rotation === 'left' &&
            this.vector.getAngle() < -this.angleLimit:
                this.rotation = 'right';
                break;
        }
    }

    update() {
        let distanceByDeltaTime = this.velocity.multiply(
            deltaTime.getTime());
        this.position.addTo(distanceByDeltaTime);
        this.turn();
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
            this.vector.getAngle(),
            this.velocity,
        );
        pm.addParticle(bullet);
    }
}
