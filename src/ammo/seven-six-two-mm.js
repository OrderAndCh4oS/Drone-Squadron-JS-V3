import Bullet from '../abstract/bullet';
import { colours } from '../constants';

export default class SevenSixTwoMM extends Bullet {
    constructor(id, squadId, x, y, angle, velocity) {
        super(id, squadId, x, y, 50, 2, angle, velocity, 18);
        this._color = colours.green;
    }
}