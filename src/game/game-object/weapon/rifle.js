import canvas from '../../service/canvas';
import Weapon from '../abstract/weapon';
import sounds from '../../assets/audio/sound';

export default class Rifle extends Weapon {
    constructor(name, fireRate, round) {
        super(name, fireRate, round, '#577', sounds.rifleTwo);
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
