import Gimbal from '../game-object/utility/gimbal';

export default class GimbalFactory {
    constructor(params) {
        this._params = params;
    }

    make() {
        return new Gimbal(this._params.angle, this._params.turning_speed);
    }
}
