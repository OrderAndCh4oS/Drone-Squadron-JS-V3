import Steering from '../game-object/utility/steering';

export default class SteeringFactory {
    constructor(params) {
        this._params = params;
    }

    make() {
        return new Steering(this._params.turning_speed);
    }
}
