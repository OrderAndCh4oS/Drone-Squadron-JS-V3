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

    update() {
        if((deltaTime.getElapsedTime() - this.lastFired) > this.fireRate) {
            this.fire();
            this.lastFired = deltaTime.getElapsedTime();
        }
    }

    fire() {
        const bullet = new Bullet(this.x, this.y, this.angle, 0);
        this.pm.addParticle(bullet);
    }
}
