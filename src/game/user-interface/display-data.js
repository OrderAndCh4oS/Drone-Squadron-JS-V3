import canvas from '../service/canvas';
import { colours } from '../constants/constants';

export default class DisplayData {
    constructor(x, y, colour, align = 'left', size = 16) {
        this.x = x;
        this.y = y;
        this.colour = colour;
        this.align = align;
        this.size = size;
        this.lines = [];
    }

    addLine(text) {
        this.lines.push(text);
    }

    textStyle() {
        canvas.ctx.textAlign = this.align;
        canvas.ctx.font = this.size + 'px Verdana';
        canvas.ctx.fillStyle = colours[this.colour];
    }

    draw() {
        this.textStyle();
        this.lines.map((line, index) => {
            canvas.ctx.fillText(
                line,
                this.x,
                this.y + (index + 1) * (this.size * 1.2),
            );
        });
    }
}
