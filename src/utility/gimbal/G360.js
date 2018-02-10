import Gimbal from '../gimbal';

export default class G360 extends Gimbal {
    constructor() {
        super(0.175 * 180, 0.2);
    }
}