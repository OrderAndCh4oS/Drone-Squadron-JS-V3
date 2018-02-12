import { colours, context, debug } from './constants';
import Vector from './service/vector';
import Particle from './abstract/particle';
import Health from './service/health';
import { drones } from './constants/sprites';

export default class Drone extends Particle {

    constructor(
        id, squadId, name, color, x, y, speed, angle, weapon, gimbal, scanner,
        thruster,
        steering) {
        super(id, x, y, speed, 10, angle);
        this.name = name;
        this.vector = new Vector(x, y);
        this.vector.setAngle(angle);
        this.weapon = new weapon(id, squadId, x, y, angle, gimbal);
        this._color = color;
        this.scanner = new scanner();
        this.thruster = new thruster();
        this.steering = new steering();
        this.health = new Health(100);
        this._squadId = squadId;
    }

    get squadId() {
        return this._squadId;
    }

    get angle() {
        return this.vector.getAngle();
    }

    set angle(angle) {
        this.vector.setAngle(angle);
    }

    update() {
        this.scanner.findTarget(this);
        this.thruster.setPower(this);
        this.steering.turn(this);
        if(this.thruster.isThrusting()) {
            this.velocity.setAngle(this.vector.getAngle());
        }
        this.move();
        this.weapon.update(this);
    }

    draw() {
        this.weapon.draw();
        this.thruster.draw(this);
        context.translate(this.position.x, this.position.y);
        this.drawName();
        this.drawData();
        this.drawSprite();
        context.resetTransform();
        this.health.draw(this);
        this.scanner.draw(this);
    }

    drawSprite() {
        context.rotate(this.vector.getAngle() + (Math.PI / 180) * 90);
        context.translate(-12.5, -14);
        context.drawImage(drones[this._color], 0, 0);
    }

    drawDrone() {
        context.beginPath();
        context.moveTo(10, 0);
        context.lineTo(-10, -7);
        context.lineTo(-10, 7);
        context.lineTo(10, 0);
        context.strokeStyle = this._color;
        context.stroke();
        context.fillStyle = this._color;
        context.fill();
    }

    drawName() {
        if(debug.droneNameToggle) {
            context.textAlign = 'center';
            context.fillStyle = colours[this._color];
            context.fillText(this.name, 0, -18);
        }
    }

    drawData() {
        if(debug.droneDataToggle) {
            context.textAlign = 'left';
            context.fillStyle = colours[this._color];
            context.fillText('ID: ' + this.id, 25, -10);
            context.fillText('SquadID: ' + this.squadId, 25, 0);
            context.fillText('Health: ' + this.health.health, 25, 10);
            const positionText = `Position: (${Math.round(
                this.position.x)}, ${Math.round(this.position.y)})`;
            context.fillText(positionText, 25, 20);
            const gridText = `Grid: (${this.gridX}, ${this.gridY})`;
            context.fillText(gridText, 25, 30);
        }
    }
}
