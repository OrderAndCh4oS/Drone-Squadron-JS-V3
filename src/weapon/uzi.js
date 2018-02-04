import Weapon from '../abstract/weapon';
import NineMM from '../ammo/nine-mm';
import { context } from '../constants';

export default class Uzi extends Weapon {
    constructor(x, y, angle, gimbal) {
        const fireRate = 4;
        const round = NineMM;
        super(x, y, angle, gimbal, round, fireRate);
    }

    draw() {
        context.translate(this.position.x, this.position.y);
        context.rotate(this.gimbal.vector.getAngle() + this.droneAngle);
        context.beginPath();
        context.lineTo(6, -1);
        context.lineTo(6, 1);
        context.lineTo(0, 1);
        context.lineTo(0, -1);
        context.strokeStyle = '#333';
        context.stroke();
        context.fillStyle = '#333';
        context.fill();
        context.resetTransform();
    }

}