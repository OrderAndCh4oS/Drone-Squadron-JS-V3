import Gimbal from '../gimbal';

export default class G60 extends Gimbal {
    constructor() {
        super(0.175 * 3, 0.12);
    }
}