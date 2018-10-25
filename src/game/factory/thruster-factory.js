import Thruster from '../game-object/utility/thruster';

export default class ThrusterFactory {
    constructor(params) {
        this._params = params;
    }

    make() {
        return new Thruster(this._params.thrust_power);
    }
}
