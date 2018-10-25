import canvas from '../../service/canvas';
import { pm } from '../../constants/constants';
import { deltaTime } from '../../service/delta-time';
import Vector from '../../service/vector';
import { angleTo } from '../../functions';

export default class Weapon {
    attachDrone = (drone) => {
        this.drone = drone;
        this.id = drone.id;
        this.squadId = drone.squadId;
    };

    get name() {
        return this._name;
    }

    attachGimbal = (gimbal) => {
        this.gimbal = gimbal;
    };

    constructor(name, fireRate, roundType, colour = '#766') {
        this.drone = null;
        this.id = null;
        this.colour = colour;
        this.velocity = 0;
        this.fireRate = fireRate;
        this.lastFired = 0;
        this.round = roundType;
        this._name = name;
    }

    setPosition(x, y) {
        this.position = new Vector(x, y);
    }

    draw() {
        canvas.ctx.translate(this.position.x, this.position.y);
        canvas.ctx.rotate(this.gimbal.vector.getAngle() + this.droneAngle);
        canvas.ctx.beginPath();
        canvas.ctx.lineTo(10, -2);
        canvas.ctx.lineTo(10, 2);
        canvas.ctx.lineTo(0, 2);
        canvas.ctx.lineTo(0, -2);
        canvas.ctx.strokeStyle = this.colour;
        canvas.ctx.stroke();
        canvas.ctx.fillStyle = this.colour;
        canvas.ctx.fill();
        canvas.ctx.resetTransform();
    }

    update(drone) {
        this.position.x = drone.position.x;
        this.position.y = drone.position.y;
        this.velocity = drone.velocity;
        this.droneAngle = drone.vector.getAngle();
        this.gimbal.trackTarget(drone);
        const angleToTarget = angleTo(drone.angle,
            drone.scanner.angleToTarget());
        if(
            drone.scanner.hasTarget() &&
            angleToTarget <= this.gimbal.angleLimit + 0.01 &&
            angleToTarget >= -(this.gimbal.angleLimit + 0.01)
        ) {
            this.fireIfReady();
        }
    }

    fireIfReady() {
        if((deltaTime.getElapsedTime() - this.lastFired) > this.fireRate) {
            this.fire();
            this.lastFired = deltaTime.getElapsedTime();
        }
    }

    fire() {
        pm.addParticle(
            this.round.make(
                this.drone,
                this.position.x,
                this.position.y,
                this.gimbal.vector.getAngle() + this.droneAngle,
                this.velocity,
            ),
        );
    }

    applyFill() {
        canvas.ctx.fillStyle = this.colour;
        canvas.ctx.fill();
    }

    applyStroke() {
        canvas.ctx.strokeStyle = this.colour;
        canvas.ctx.stroke();
    }
}
