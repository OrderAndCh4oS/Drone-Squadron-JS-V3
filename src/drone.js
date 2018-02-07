import { context } from './constants';
import Vector from './service/vector';
import Particle from './abstract/particle';

export default class Drone extends Particle {
    constructor(id, color, x, y, speed, angle, weapon, gimbal, scanner) {
        super(id, x, y, speed, 10, angle);
        this.vector = new Vector(x, y);
        this.vector.setAngle(angle);
        this.weapon = new weapon(id, x, y, angle, gimbal);
        this._health = 10;
        this.color = color;
        this.scanner = scanner;
    }

    get health() {
        return this._health;
    }

    takeDamage(damage) {
        this._health -= damage;
    }

    update() {
        this.scanner.findTarget(this);
        const targetAngle = this.scanner.angleToTarget();
        if(targetAngle > 0.1) {
            this.vector.setAngle(this.vector.getAngle() + 0.02);
        } else if(targetAngle < -0.1) {
            this.vector.setAngle(this.vector.getAngle() - 0.02);
        } else {
            this.vector.setAngle(this.vector.getAngle() + Math.random() * 0.06 -
                0.03);
        }
        this.velocity.setAngle(this.vector.getAngle());
        this.move();
        this.weapon.update(this.position, this.vector, this.velocity,
            this.scanner);
    }

    draw() {
        context.translate(this.position.x, this.position.y);
        context.rotate(this.vector.getAngle());
        context.beginPath();
        context.moveTo(10, 0);
        context.lineTo(-10, -7);
        context.lineTo(-10, 7);
        context.lineTo(10, 0);
        context.strokeStyle = this.color;
        context.stroke();
        context.fillStyle = this.color;
        context.fill();
        context.resetTransform();
        if(this.scanner.hasTarget()) {
            context.translate(this.scanner.target.position.x,
                this.scanner.target.position.y);
            context.beginPath();
            context.moveTo(-5, -5);
            context.lineTo(5, 5);
            context.moveTo(5, -5);
            context.lineTo(-5, 5);
            context.strokeStyle = '#ffffff';
            context.strokeWidth = 2;
            context.stroke();
            context.resetTransform();
            context.setLineDash([1, 2]);
            context.beginPath();
            context.moveTo(this.position.x, this.position.y);
            context.lineTo(this.scanner.target.position.x,
                this.scanner.target.position.y);
            context.strokeStyle = this.color;
            context.strokeWidth = 1;
            context.strokeOpacity = 0.5;
            context.stroke();
        }
        this.weapon.draw();
    }
}