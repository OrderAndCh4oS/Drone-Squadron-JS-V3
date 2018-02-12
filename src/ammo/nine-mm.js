import Bullet from '../abstract/bullet';
import { colours } from '../constants';

export default class NineMM extends Bullet {
    constructor(id, squadId, x, y, angle, velocity) {
        super(id, squadId, x, y, 45, 1, angle, velocity, 3);
        this._color = colours.orange;
    }
}