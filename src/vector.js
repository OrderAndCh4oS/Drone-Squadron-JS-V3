import Point from './point';

export default class Vector {
    constructor(x, y) {
        this._point = new Point(x, y);
    }

    get x() {
        return this._point.x;
    }

    set x(value) {
        this._point.x = value;
    }

    get y() {
        return this._point.y;
    }

    set y(value) {
        this._point.y = value;
    }

    get point() {
        return this._point;
    }

    set point(value) {
        this._point = value;
    }

    setAngle(angle) {
        const length = this.getLength();
        this._point.x = Math.cos(angle) * length;
        this._point.y = Math.sin(angle) * length;
    }

    getAngle() {
        return Math.atan2(this._point.y, this._point.x);
    }

    setLength(length) {
        const angle = this.getAngle();
        this._point.x = Math.cos(angle) * length;
        this._point.y = Math.sin(angle) * length;
    }

    getLength() {
        return Math.sqrt(this._point.x * this._point.x + this._point.y *
            this._point.y);
    }

    add(v2) {
        return new Vector(this._point.x + v2.x, this._point.y + v2.y);
    }

    subtract(v2) {
        return new Vector(this._point.x - v2.x, this._point.y - v2.y);
    }

    multiply(value) {
        return new Vector(this._point.x * value, this._point.y * value);
    }

    divide(value) {
        return new Vector(this._point.x / value, this._point.y / value);
    }

    addTo(v2) {
        this._point.x += v2.x;
        this._point.y += v2.y;
    }

    subtractFrom(v2) {
        this._point.x -= v2.x;
        this._point.y -= v2.y;
    }

    multiplyBy(value) {
        this._point.x *= value;
        this._point.y *= value;
    }

    divideBy(value) {
        this._point.x /= value;
        this._point.y /= value;
    }
}