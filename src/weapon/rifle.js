import Weapon from '../abstract/weapon';
import { context } from '../constants';
import SevenSixTwoMM from '../ammo/seven-six-two-mm';

export default class Rifle extends Weapon {
    constructor(x, y, angle, gimbal) {
        const fireRate = 10;
        const round = SevenSixTwoMM;
        super(x, y, angle, gimbal, round, fireRate);
    }

    draw() {
        context.translate(this.position.x, this.position.y);
        context.rotate(this.gimbal.vector.getAngle() + this.droneAngle);
        context.beginPath();
        context.lineTo(10, -2);
        context.lineTo(10, 2);
        context.lineTo(5, 2);
        context.lineTo(5, -2);
        context.strokeStyle = '#555';
        context.stroke();
        context.fillStyle = '#555';
        context.fill();
        context.resetTransform();
    }

}