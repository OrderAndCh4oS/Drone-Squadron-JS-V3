import Bullet from './bullet';
import { Context, pm } from './constants';
import { deltaTime } from './delta-time';
import Vector from './vector';
import Point from './point';

export default class Weapon {

    constructor(x, y, angle, fireRate, angleLimit, turningSpeed) {
        this.position = new Point(x, y);
        this.vector = new Vector(x, y);
        this.vector.setLength(10);
        this.vector.setAngle(angle);
        this.fireRate = fireRate;
        this.lastFired = 0;
        this.rotation = 'right';
        this.angleLimit = angleLimit;
        this.turningSpeed = turningSpeed;
        console.log(this.vector.x, this.vector.y);
    }

    draw() {
        Context.translate(this.position.x, this.position.y);
        Context.rotate(this.vector.getAngle());
        Context.beginPath();
        Context.lineTo(10, -2);
        Context.lineTo(10, 2);
        Context.lineTo(0, 2);
        Context.lineTo(0, -2);
        Context.strokeStyle = '#000';
        Context.stroke();
        Context.fillStyle = '#000';
        Context.fill();
        Context.resetTransform();
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
        const bullet = new Bullet(this.position.x, this.position.y,
            this.vector.getAngle(), 0.15);
        pm.addParticle(bullet);
    }
}
