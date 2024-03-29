import canvas from '../service/canvas';
import { colours, debug } from '../constants/constants';
import Vector from '../service/vector';
import Particle from './abstract/particle';
import Health from '../service/health';
import { drones } from '../constants/sprites';
import DisplayData from '../user-interface/display-particle-data';

export default class Drone extends Particle {
    constructor(
        drone, squad, weapon, thruster, steering, scanner, x, y, angle) {
        super(drone.id, x, y, 0, 13, angle);
        this._squadId = squad.id;
        this._colour = squad.colour;
        this.name = drone.name;
        this.vector = new Vector(0, 1);
        this.vector.setAngle(angle);
        this.weapon = weapon;
        this.scanner = scanner;
        this.thruster = thruster;
        this.steering = steering;
        this.health = new Health(100);
        this._damage = 0;
        this._kills = 0;
        this._killed = [];
    }

    get killed() {
        return this._killed;
    }

    get damage() {
        return this._damage;
    }

    get kills() {
        return this._kills;
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

    updateDamage(damage) {
        this._damage = +(this._damage + damage).toFixed(2);
    }

    updateKills(killedDrone) {
        this._kills++;
        this._killed.push(killedDrone);
    }

    update() {
        this.scanner.scanArea(this);
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
        canvas.ctx.translate(this.position.x, this.position.y);
        this.drawName();
        this.drawData();
        this.drawSprite();
        canvas.ctx.resetTransform();
        this.health.draw(this);
        this.scanner.draw(this);
    }

    drawSprite() {
        canvas.ctx.rotate(this.vector.getAngle() + (Math.PI / 180) * 90);
        canvas.ctx.translate(-12.5, -14);
        canvas.ctx.drawImage(drones[this._colour], 0, 0);
    }

    drawDrone() {
        canvas.ctx.beginPath();
        canvas.ctx.moveTo(10, 0);
        canvas.ctx.lineTo(-10, -7);
        canvas.ctx.lineTo(-10, 7);
        canvas.ctx.lineTo(10, 0);
        canvas.ctx.strokeStyle = this._colour;
        canvas.ctx.stroke();
        canvas.ctx.fillStyle = this._colour;
        canvas.ctx.fill();
    }

    drawName() {
        if(debug.droneName) {
            canvas.ctx.font = '11px Verdana';
            canvas.ctx.textAlign = 'center';
            canvas.ctx.fillStyle = colours[this._colour];
            canvas.ctx.fillText(this.name, 0, -18);
        }
    }

    drawData() {
        if(debug.droneData) {
            const x = Math.round(this.position.x);
            const y = Math.round(this.position.y);
            const positionText = `Position: (${x}, ${y})`;
            const gridText = `Grid: (${this.gridX}, ${this.gridY})`;
            const displayData = new DisplayData(0, 0, this.colour);
            displayData.addLine('ID: ' + this.id);
            displayData.addLine('SquadID: ' + this.squadId);
            displayData.addLine('Weapon: ' + this.weapon.name);
            displayData.addLine('Health: ' + this.health.currentHealth);
            displayData.addLine('Damage: ' + this._damage);
            displayData.addLine('Kills: ' + this._kills);
            displayData.addLine(positionText);
            displayData.addLine(gridText);
            displayData.draw();
        }
    }
}
