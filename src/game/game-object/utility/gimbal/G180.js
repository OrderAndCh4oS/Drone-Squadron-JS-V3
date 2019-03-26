import Gimbal from '../gimbal';

export default class G180 extends Gimbal {
    constructor() {
        super(0.175 * 9, 0.15);
    }
}