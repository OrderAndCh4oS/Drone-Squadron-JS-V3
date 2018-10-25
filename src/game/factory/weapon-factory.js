import { weapons } from '../constants/weapons';
import RoundTypeFactory from './round-type-factory';

export default class WeaponFactory {
    constructor(params) {
        this._params = params;
        this._gimbals = null;
    }

    attachGimbals(gimbals) {
        this._gimbals = gimbals;
    }

    make() {
        const roundType = new RoundTypeFactory(
            this._params.round_speed,
            this._params.round_radius,
            this._params.round_damage,
            this._params.round_colour,
        );
        const weapon = new weapons[this._params.name](this._params.name,
            this._params.fire_rate, roundType);
        weapon.attachGimbal(this._gimbals);
        return weapon;
    }
}
