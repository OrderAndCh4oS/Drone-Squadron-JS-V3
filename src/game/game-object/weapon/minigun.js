import Weapon from '../abstract/weapon';
import canvas from '../../service/canvas';
import sounds from '../../assets/audio/sound';

export default class Minigun extends Weapon {
    constructor(name, fireRate, round) {
        super(name, fireRate, round, '#58aaa8', sounds.rifleTwo);
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
}
