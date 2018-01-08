import { context } from './constants';

import Vector from './vector';
import { deltaTime } from './delta-time';

export default class Particle {
    constructor(x, y, speed = 10, radius = 50, angle = 0) {
        this.radius = radius;
        this.position = new Vector(x, y);
        this.velocity = new Vector(0, 0);
        this.velocity.setLength(speed);
        this.velocity.setAngle(angle);
    }

    update(offset) {
        let distanceByDeltaTime = this.velocity.multiply(
            deltaTime.getOffsetTime(offset));
        this.position.addTo(distanceByDeltaTime);
    }

    draw() {
        context.beginPath();
        context.arc(this.position.x, this.position.y, this.radius, 0, 2 *
            Math.PI);
        context.stroke();
    }
}