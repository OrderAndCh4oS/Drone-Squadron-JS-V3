import Gimbal from '../gimbal';

export default class Fixed extends Gimbal {
    constructor() {
        super(0.175 * 0.25, 0.1);
    }
}
