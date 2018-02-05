import { context, grid } from '../constants';

import Vector from '../service/vector';
import { deltaTime } from '../service/delta-time';

export default class Particle {
    constructor(id, x, y, speed = 10, radius = 50, angle = 0) {
        this._id = id;
        this.radius = radius;
        this.position = new Vector(x, y);
        this.velocity = new Vector(0, 0);
        this.velocity.setLength(speed);
        this.velocity.setAngle(angle);
        this._remove = false;
    }

    get remove() {
        return this._remove;
    }

    get id() {
        return this._id;
    }

    update() {
        let distanceByDeltaTime = this.velocity.multiply(deltaTime.getTime());
        this.move(distanceByDeltaTime);
    }

    move() {
        let distanceByDeltaTime = this.velocity.multiply(deltaTime.getTime());
        grid.removeParticle(this);
        this.position.addTo(distanceByDeltaTime);
        grid.addParticle(this);
    }

    removeParticle() {
        this._remove = true;
        grid.removeParticle(this);
    }

    draw() {
        context.beginPath();
        context.arc(
            this.position.x,
            this.position.y,
            this.radius,
            0,
            2 * Math.PI);
        context.stroke();
    }
}