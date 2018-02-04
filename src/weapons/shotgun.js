import Weapon from '../abstract/weapon';
import { context, pm } from '../constants';
import Shot from '../ammo/shot';

export default class Shotgun extends Weapon {
    constructor(x, y, angle, gimbal) {
        const fireRate = 8;
        const round = Shot;
        super(x, y, angle, gimbal, round, fireRate);
    }

    draw() {
        context.translate(this.position.x, this.position.y);
        context.rotate(this.gimbal.vector.getAngle() + this.droneAngle);
        context.beginPath();
        context.lineTo(8, -2);
        context.lineTo(8, 2);
        context.lineTo(0, 2);
        context.lineTo(0, -2);
        context.strokeStyle = '#222';
        context.stroke();
        context.fillStyle = '#222';
        context.fill();
        context.resetTransform();
    }

    fire() {
        for(let i = 0; i < 12; i++) {
            const scatter = Math.random() * 0.08 - 0.04;
            pm.addParticle(
                new this.round(
                    this.position.x,
                    this.position.y,
                    this.gimbal.vector.getAngle() + this.droneAngle + scatter,
                    this.velocity,
                ),
            );
        }
    }
}