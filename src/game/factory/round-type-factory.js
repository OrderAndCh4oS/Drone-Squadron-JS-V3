import Bullet from '../game-object/ammo/bullet';

export default class RoundTypeFactory {
    constructor(speed, radius, damage, colour) {
        this._speed = speed;
        this._radius = radius;
        this._damage = damage;
        this._colour = colour;
    }

    make(drone, x, y, angle, velocity) {
        return new Bullet(drone, x, y, angle, velocity,
            this._speed,
            this._radius,
            this._damage,
            this._colour,
        );
    }
}
