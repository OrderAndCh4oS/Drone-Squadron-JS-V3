import { weapons } from '../constants/weapons';

export default class WeaponFactory {
    constructor(params) {
        this._params = params;
    }

    make() {
        return new weapons[this._params.name](
            this._params.name,
            this._params.fire_rate,
            this._params.round_type,
        );
    }
}
