import Scanner from '../game-object/utility/scanner';

export default class ScannerFactory {
    constructor(params) {
        this._params = params;
    }

    make() {
        return new Scanner(this._params.radius);
    }
}
