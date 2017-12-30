
export default class DeltaTime {
    constructor() {
        this.lastTime = Date.now();
        this.deltaTime = 0;
    }

    update() {
        const date = Date.now();
        this.deltaTime = date - this.lastTime;
        this.lastTime = date;
    }

    getTime() {
        return this.deltaTime / 100;
    }

    getOffsetTime(offset) {
        return this.deltaTime / 100 + offset;
    }
}