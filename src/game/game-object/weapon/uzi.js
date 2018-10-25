import Weapon from '../abstract/weapon';
import canvas from '../../service/canvas';

export default class Uzi extends Weapon {
    constructor(name, fireRate, round) {
        super(name, fireRate, round, '#86aa98');
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
