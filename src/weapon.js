import Bullet from './bullet';
import { deltaTime } from './delta-time';

export default class Weapon {
    constructor(x, y, angle, pm) {
        this.x = x;
        this.y = y;
        this.angle = angle;
        this.fireRate = 5;
        this.lastFired = 0;
        this.pm = pm;
    }

    setTarget(target) {
        this.target = target;
    }

    draw(ctx) {
        ctx.translate(this.x, this.y);
        ctx.rotate(this.angle);
        ctx.beginPath();
        ctx.lineTo(-10, 0);
        ctx.lineTo(-10, 4);
        ctx.lineTo(0, 4);
        ctx.lineTo(0, 0);
        ctx.strokeStyle = '#000';
        ctx.stroke();
        ctx.fillStyle = '#000';
        ctx.fill();
        ctx.resetTransform();
    }

    update() {
        if((deltaTime.getElapsedTime() - this.lastFired) > this.fireRate) {
            this.fire();
            this.lastFired = deltaTime.getElapsedTime();
        }
    }

    fire() {
        const bullet = new Bullet(this.x, this.y + 2, this.angle, 0.15);
        this.pm.addParticle(bullet);
    }
}
