import Bullet from '../abstract/bullet';
import { colours } from '../constants/constants';

export default class SevenSixTwoMM extends Bullet {
    constructor(drone, x, y, angle, velocity) {
        super(drone, x, y, 50, 2, angle, velocity, 18);
        this._colour = colours.green;
    }
}