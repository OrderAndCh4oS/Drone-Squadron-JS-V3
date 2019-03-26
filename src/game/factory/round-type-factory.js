import Bullet from '../game-object/ammo/bullet';

export default class RoundTypeFactory {
    constructor(params) {
        this._id = params.id;
        this._speed = params.speed;
        this._radius = params.radius;
        this._damage = params.damage;
        this._colour = params.colour;
    }

    get id() {
        return this._id;
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
