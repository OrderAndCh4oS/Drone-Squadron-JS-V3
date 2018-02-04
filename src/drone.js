import { context } from './constants';
import Vector from './vector';
import { deltaTime } from './delta-time';
import Gimbal from './weapons/gimbal';
import Rifle from './weapons/rifle';

export default class Drone {
    constructor(x, y, speed = 10, angle = 0) {
        this.position = new Vector(x, y);
        this.vector = new Vector(x, y);
        this.vector.setAngle(angle);
        this.velocity = new Vector(0, 0);
        this.velocity.setLength(speed);
        this.velocity.setAngle(angle);
        const gimbal = new Gimbal(0.5, 0.01);
        this.weapon = new Rifle(x, y, angle, gimbal);
    }

    update() {
        if(Math.random() > 0.5) {
            this.vector.setAngle(this.vector.getAngle() + Math.random() * 0.05);
        } else {
            this.vector.setAngle(this.vector.getAngle() - Math.random() * 0.05);
        }
        this.velocity.setAngle(this.vector.getAngle());
        let distanceByDeltaTime = this.velocity.multiply(deltaTime.getTime());
        this.position.addTo(distanceByDeltaTime);
        this.weapon.update(this.position, this.vector, this.velocity);
    }

    draw() {
        context.translate(this.position.x, this.position.y);
        context.rotate(this.vector.getAngle());
        context.beginPath();
        context.moveTo(10, 0);
        context.lineTo(-10, -7);
        context.lineTo(-10, 7);
        context.lineTo(10, 0);
        context.stroke();
        context.fillStyle = '#000000';
        context.fill();
        context.resetTransform();
        this.weapon.draw();
    }
}