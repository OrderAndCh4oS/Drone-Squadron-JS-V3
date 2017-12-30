class DeltaTime {

    constructor(){
        this.startTime = Date.now();
        this.lastTime = Date.now();
        this.deltaTime = 0;
    }

    update() {
        const time = Date.now();
        this.deltaTime = time - this.lastTime;
        this.lastTime = time;
    }

    getTime() {
        return this.deltaTime / 100;
    }

    getOffsetTime(offset) {
        return this.deltaTime / 100 + offset;
    }

    getElapsedTime() {
        return (Date.now() - this.startTime) / 100;
    }

    getOffsetElapsedTime(offset) {
        return (Date.now() - this.startTime) / 100 + offset;
    }
}

export const deltaTime = new DeltaTime();