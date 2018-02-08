import { context } from './constants';
import Vector from './service/vector';
import Particle from './abstract/particle';

export default class Drone extends Particle {
    constructor(
        id, color, x, y, speed, angle, weapon, gimbal, scanner, thruster,
        steering) {
        super(id, x, y, speed, 10, angle);
        this.vector = new Vector(x, y);
        this.vector.setAngle(angle);
        this.weapon = new weapon(id, x, y, angle, gimbal);
        this._health = 10;
        this._color = color;
        this.scanner = scanner;
        this.thruster = thruster;
        this.steering = steering;
    }

    get health() {
        return this._health;
    }

    get angle() {
        return this.vector.getAngle();
    }

    set angle(angle) {
        this.vector.setAngle(angle);
    }

    takeDamage(damage) {
        this._health -= damage;
    }

    update() {
        this.scanner.findTarget(this);
        this.thruster.setPower(this);
        this.steering.turn(this);
        this.velocity.setAngle(this.vector.getAngle());
        this.move();
        this.weapon.update(this);
    }

    draw() {
        context.translate(this.position.x, this.position.y);
        context.rotate(this.vector.getAngle());
        context.beginPath();
        context.moveTo(10, 0);
        context.lineTo(-10, -7);
        context.lineTo(-10, 7);
        context.lineTo(10, 0);
        context.strokeStyle = this._color;
        context.stroke();
        context.fillStyle = this._color;
        context.fill();
        context.resetTransform();
        this.scanner.draw(this);
        this.weapon.draw();
    }
}