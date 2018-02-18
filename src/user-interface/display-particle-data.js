import { colours, context } from '../constants/constants';
import DisplayData from './display-data';

export default class DisplayParticleData extends DisplayData {
    constructor(x, y, colour) {
        super(x, y + 25, colour);
    }

    draw() {
        this.textStyle(9);
        this.lines.map((line, index) => {
            context.fillText(
                line,
                25,
                (index + 1 - this.lines.length / 2) * 10,
            );
        });
    }
}