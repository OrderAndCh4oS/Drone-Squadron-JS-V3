import Bullet from './bullet';
import { deltaTime } from './delta-time';

export default class Weapon {
    constructor(x, y, angle, pm) {
        this.x = x;
        this.y = y;
        this.angle = angle;
        this.fireRate = 10;
        this.lastFired = 0;
        this.pm = pm;
    }

    update() {
        console.log((deltaTime.getElapsedTime() - this.lastFired));
        if((deltaTime.getElapsedTime() - this.lastFired) > this.fireRate) {
            this.fire();
            this.lastFired = deltaTime.getElapsedTime();
        }
    }

    fire() {
        const bullet = new Bullet(this.x, this.y, this.angle, 0);
        this.pm.addParticle(bullet);
        const bullet1 = new Bullet(this.x, this.y, this.angle, 2);
        this.pm.addParticle(bullet1);
        const bullet2 = new Bullet(this.x, this.y, this.angle, 4);
        this.pm.addParticle(bullet2);
        console.log('fire');
    }
}