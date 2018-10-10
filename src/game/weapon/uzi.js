import Weapon from '../abstract/weapon';
import NineMM from '../ammo/nine-mm';
import canvas from '../service/canvas';

export default class Uzi extends Weapon {
    constructor(drone, x, y, angle, gimbal) {
        const fireRate = 2;
        const round = NineMM;
        super(drone, 'Uzi', '#8aa', x, y, angle, gimbal, round, fireRate);
    }

    draw() {
        canvas.ctx.translate(this.position.x, this.position.y);
        canvas.ctx.rotate(this.gimbal.vector.getAngle() + this.droneAngle);
        canvas.ctx.beginPath();
        canvas.ctx.lineTo(6, -1);
        canvas.ctx.lineTo(6, 1);
        canvas.ctx.lineTo(0, 1);
        canvas.ctx.lineTo(0, -1);
        this.applyStroke();
        this.applyFill();
        canvas.ctx.resetTransform();
    }

}
