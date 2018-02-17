import { colours, context } from '../constants';

export default class DisplayData {
    constructor(x, y, colour) {
        this.x = x;
        this.y = y + 25;
        this.colour = colour;
        this.lines = [];
    }

    addLine(text) {
        this.lines.push(text);
    }

    draw() {
        context.textAlign = 'left';
        context.fillStyle = colours[this.colour];
        this.lines.map((line, index) => {
            context.fillText(line, 25, (index + 1 - this.lines.length / 2) *
                10);
        });
    }
}