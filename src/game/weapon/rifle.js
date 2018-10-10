import canvas from '../service/canvas';
import Weapon from '../abstract/weapon';
import SevenSixTwoMM from '../ammo/seven-six-two-mm';

export default class Rifle extends Weapon {
    constructor(drone, x, y, angle, gimbal) {
        const fireRate = 10;
        const round = SevenSixTwoMM;
        super(drone, 'Rifle', '#577', x, y, angle, gimbal, round, fireRate);
    }

    draw() {
        canvas.ctx.translate(this.position.x, this.position.y);
        canvas.ctx.rotate(this.gimbal.vector.getAngle() + this.droneAngle);
        canvas.ctx.beginPath();
        canvas.ctx.lineTo(10, -2);
        canvas.ctx.lineTo(10, 2);
        canvas.ctx.lineTo(0, 2);
        canvas.ctx.lineTo(0, -2);
        this.applyStroke();
        this.applyFill();
        canvas.ctx.resetTransform();
    }

}
