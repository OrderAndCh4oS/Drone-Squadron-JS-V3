import Weapon from '../abstract/weapon';
import NineMM from '../ammo/nine-mm';
import { context } from '../constants';

export default class Uzi extends Weapon {
    constructor(id, x, y, angle, gimbal) {
        const fireRate = 2;
        const round = NineMM;
        super(id, '#8aa', x, y, angle, gimbal, round, fireRate);
    }

    draw() {
        context.translate(this.position.x, this.position.y);
        context.rotate(this.gimbal.vector.getAngle() + this.droneAngle);
        context.beginPath();
        context.lineTo(6, -1);
        context.lineTo(6, 1);
        context.lineTo(0, 1);
        context.lineTo(0, -1);
        this.applyStroke();
        this.applyFill();
        context.resetTransform();
    }

}