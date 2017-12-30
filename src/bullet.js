import Particle from './particle';
import {deltaTime} from './delta-time';

export default class Bullet extends Particle {
    constructor(x, y, angle, delay = 0) {
        super(x, y, 50, 10, angle);
        this.damage = 5;
        this.delay = delay;
    }

    update() {
        if(this.delay > 0) {
            this.delay -= deltaTime.getTime();
            if(this.delay <= 0 && Math.abs(this.delay) < deltaTime.getTime()) {
                super.update(Math.abs(this.delay));
            }
        } else {
            super.update(0);
        }
    }

    draw(ctx) {
        if(this.delay <= 0) {
            super.draw(ctx);
        }
    }
}