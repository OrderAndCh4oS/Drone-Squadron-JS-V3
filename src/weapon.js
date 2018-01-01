import Bullet from './bullet';
import { Context, pm } from './constants';
import { deltaTime } from './delta-time';

export default class Weapon {

    constructor(x, y, angle, fireRate, angleLimit, turningSpeed) {
        this.x = x;
        this.y = y;
        this.angle = angle;
        this.fireRate = fireRate;
        this.lastFired = 0;
        this.rotation = 'right';
        this.angleLimit = angleLimit;
        this.turningSpeed = turningSpeed;
    }

    setTarget(target) {
        this.target = target;
    }

    setAngle(angle) {
        this.angle = angle;
    }

    draw() {
        Context.translate(this.x, this.y);
        Context.rotate(this.angle);
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
            case this.rotation === 'right' && this.angle < this.angleLimit:
                this.angle += this.turningSpeed;
                break;
            case this.rotation === 'left' && this.angle > -this.angleLimit:
                this.angle -= this.turningSpeed;
                break;
            case this.rotation === 'right' && this.angle > this.angleLimit:
                this.rotation = 'left';
                break;
            case this.rotation === 'left' && this.angle < -this.angleLimit:
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
        const bullet = new Bullet(this.x + 10, this.y, this.angle, 0.15);
        pm.addParticle(bullet);
    }
}
