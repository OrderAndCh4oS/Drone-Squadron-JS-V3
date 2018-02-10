import Gimbal from '../gimbal';

export default class G40 extends Gimbal {
    constructor() {
        super(0.175 * 2, 0.1);
    }
}