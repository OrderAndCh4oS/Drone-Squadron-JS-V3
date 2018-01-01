import { Context } from './constants';
import Particle from './particle';
import { deltaTime } from './delta-time';

export default class Bullet extends Particle {
    constructor(x, y, angle, delay = 0) {
        super(x, y, 30, 2, angle);
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

    draw() {
        if(this.delay <= 0) {
            super.draw(Context);
        }
    }
}