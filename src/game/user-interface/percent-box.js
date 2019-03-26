import canvas from '../service/canvas';

export default class PercentBox {

    constructor(x, y, width, height, fill, stroke) {
        this._x = x;
        this._y = y;
        this._width = width;
        this._height = height;
        this._fill = fill;
        this._stroke = stroke;
        this._percentage = 100;
    }

    setPercentage(value, total) {
        this._percentage = value / total * 100;
    }

    draw() {
        canvas.ctx.translate(this._x - this._width / 2, this._y);
        this.drawStroke();
        this.drawFill();
        canvas.ctx.resetTransform();
    }

    drawFill() {
        this.drawPercentBox(this._percentage);
        canvas.ctx.fillStyle = this._fill;
        canvas.ctx.fill();
    }

    drawStroke() {
        this.drawPercentBox();
        canvas.ctx.strokeStyle = this._stroke;
        canvas.ctx.stroke();
    }

    drawPercentBox(percentage = 100) {
        canvas.ctx.beginPath();
        canvas.ctx.moveTo(0, 0);
        canvas.ctx.lineTo(this._width * percentage / 100, 0);
        canvas.ctx.lineTo(this._width * percentage / 100, this._height);
        canvas.ctx.lineTo(0, this._height);
        canvas.ctx.lineTo(0, 0);
    }
}
