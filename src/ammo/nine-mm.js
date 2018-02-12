import Bullet from '../abstract/bullet';
import { colours } from '../constants';

export default class NineMM extends Bullet {
    constructor(id, x, y, angle, velocity) {
        super(id, x, y, 45, 1, angle, velocity, 3);
        this._color = colours.orange;
    }
}