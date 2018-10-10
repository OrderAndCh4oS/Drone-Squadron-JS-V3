import Weapon from '../abstract/weapon';
import { pm } from '../constants/constants';
import canvas from '../service/canvas';
import Shot from '../ammo/shot';

export default class Shotgun extends Weapon {
    constructor(drone, x, y, angle, gimbal) {
        const fireRate = 7;
        const round = Shot;
        super(drone, 'Shotgun', '#664', x, y, angle, gimbal, round, fireRate);
    }

    draw() {
        canvas.ctx.translate(this.position.x, this.position.y);
        canvas.ctx.rotate(this.gimbal.vector.getAngle() + this.droneAngle);
        canvas.ctx.beginPath();
        canvas.ctx.lineTo(8, -2);
        canvas.ctx.lineTo(8, 2);
        canvas.ctx.lineTo(0, 2);
        canvas.ctx.lineTo(0, -2);
        this.applyStroke();
        this.applyFill();
        canvas.ctx.resetTransform();
    }

    fire() {
        for(let i = 0; i < 12; i++) {
            const scatter = Math.random() * 0.08 - 0.04;
            pm.addParticle(
                new this.round(
                    this.drone,
                    this.position.x,
                    this.position.y,
                    this.gimbal.vector.getAngle() + this.droneAngle + scatter,
                    this.velocity,
                ),
            );
        }
    }
}
