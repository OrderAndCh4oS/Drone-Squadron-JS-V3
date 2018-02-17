import { colours, context } from '../constants';

export default class DisplayData {
    constructor(x, y, colour, align = 'left') {
        this.x = x;
        this.y = y;
        this.colour = colour;
        this.align = align;
        this.lines = [];
    }

    addLine(text) {
        this.lines.push(text);
    }

    textStyle(size) {
        context.textAlign = this.align;
        context.font = size + 'px sans';
        context.fillStyle = colours[this.colour];
    }

    draw() {
        this.textStyle(16);
        this.lines.map((line, index) => {
            context.fillText(
                line,
                this.x,
                this.y + (index + 1) * 18,
            );
        });
    }
}