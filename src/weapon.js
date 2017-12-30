export default class Weapon {
    constructor(x, y, angle) {
        this.x = x;
        this.y = y;
        this.angle = angle;
        this.fireRate = 2;
        this.ammo = -1;
        this.lastFired = 0;
    }

    update() {

    }

    fire() {
        return new Bullet(this.x, this.y, this.angle, this.delay)
    }
}