import Vector from './vector';

export default class Particle {
    constructor(x, y, speed = 10, radius = 50, angle = 0) {
        this.radius = radius;
        this.angle = angle;
        this.position = new Vector(x, y);
        this.velocity = new Vector(0, 0);
        this.velocity.setLength(speed);
        this.velocity.setAngle(angle);
    }

    update(deltaTime, offset) {
        let distanceByDeltaTime = this.velocity.multiply(deltaTime.getOffsetTime(offset));
        this.position.addTo(distanceByDeltaTime);
    }

    draw(ctx) {
        ctx.beginPath();
        ctx.arc(this.position.x, this.position.y, this.radius, 0, 2 * Math.PI);
        ctx.stroke();
    }
}