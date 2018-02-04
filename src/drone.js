import { context } from './constants';
import Vector from './service/vector';
import { deltaTime } from './service/delta-time';
import Gimbal from './utility/gimbal';
import Particle from './abstract/particle';

export default class Drone extends Particle {
    constructor(id, x, y, speed = 10, angle = 0, weapon) {
        super(id, x, y, speed, 10, angle);
        this.vector = new Vector(x, y);
        this.vector.setAngle(angle);
        const gimbal = new Gimbal(0.5, 0.01);
        this.weapon = new weapon(id, x, y, angle, gimbal);
        this._health = 10;
    }

    get health() {
        return this._health;
    }

    takeDamage(damage) {
        this._health -= damage;
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