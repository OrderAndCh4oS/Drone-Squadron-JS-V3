export default class Vector {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    setX(value) {
        this.x = value;
    }

    getX() {
        return this.x;
    }

    setY(value) {
        this.y = value;
    }

    getY() {
        return this.y;
    }

    setAngle(angle) {
        const length = this.getLength();
        this.x = Math.cos(angle) * length;
        this.y = Math.sin(angle) * length;
    }

    getAngle() {
        return Math.atan2(this.y, this.x);
    }

    setLength(length) {
        const angle = this.getAngle();
        this.x = Math.cos(angle) * length;
        this.y = Math.sin(angle) * length;
    }

    getLength() {
        return Math.sqrt(this.x * this.x + this.y * this.y);
    }

    add(v2) {
        return new Vector(this.x + v2.getX(), this.y + v2.getY());
    }

    subtract(v2) {
        return new Vector(this.x - v2.getX(), this.y - v2.getY());
    }

    multiply(value) {
        return new Vector(this.x * value, this.y * value);
    }

    divide(value) {
        return new Vector(this.x / value, this.y / value);
    }

    addTo(v2) {
        this.x += v2.getX();
        this.y += v2.getY();
    }

    subtractFrom(v2) {
        this.x -= v2.getX();
        this.y -= v2.getY();
    }

    multiplyBy(value) {
        this.x *= value;
        this.y *= value;
    }

    divideBy(value) {
        this.x /= value;
        this.y /= value;
    }
}