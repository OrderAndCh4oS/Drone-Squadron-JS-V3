import Weapon from '../abstract/weapon';
import { particleManager } from '../../constants/constants';
import canvas from '../../service/canvas';
import sounds from '../../assets/audio/sound';

export default class Shotgun extends Weapon {
    constructor(name, fireRate, round) {
        super(name, fireRate, round, '#43211d', sounds.shotgunOne);
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
        this._sound.play();
        for(let i = 0; i < 12; i++) {
            const scatter = Math.random() * 0.08 - 0.04;
            particleManager.addParticle(
                this.round.make(
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
