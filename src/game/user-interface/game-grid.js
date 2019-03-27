import { colours, debug } from '../constants/constants';
import canvas from '../service/canvas';
import Drone from '../game-object/drone';

export default class GameGrid {
    constructor() {
        this.init();
    }

    init() {
        this._gridBlockSize = 100;
        this._columns = Math.round(canvas.width / this._gridBlockSize);
        this._rows = Math.round(canvas.height / this._gridBlockSize);
        this._grid = new Array(this._columns);
        for(let i = 0; i < this._grid.length; i++) {
            this._grid[i] = new Array(this._rows);
            for(let j = 0; j < this._grid.length; j++) {
                this._grid[i][j] = [];
            }
        }
    }

    get gridBlockSize() {
        return this._gridBlockSize;
    }

    get columns() {
        return this._columns;
    }

    get rows() {
        return this._rows;
    }

    get grid() {
        return this._grid;
    }

    gridHasKeys(x, y) {
        return x >= 0 && x < this._columns && y >= 0 && y < this._rows;
    }

    addParticle(particle) {
        particle.gridX = Math.floor(particle.position.x / this.gridBlockSize);
        particle.gridY = Math.floor(particle.position.y / this.gridBlockSize);
        if(!this.gridHasKeys(particle.gridX, particle.gridY)) {
            return;
        }
        this._grid[particle.gridX][particle.gridY].push(particle);
    }

    removeParticle(particle) {
        if(!this.gridHasKeys(particle.gridX, particle.gridY)) {
            return;
        }
        this._grid[particle.gridX][particle.gridY] = this._grid[particle.gridX][particle.gridY].filter(
            (p) => p.id !== particle.id);
    }

    findGridRange(drone, radius) {
        const x = drone.position.x / this.gridBlockSize;
        const y = drone.position.y / this.gridBlockSize;
        const blockRadius = (radius / this.gridBlockSize) + 2;
        this.gridRange = {
            start: [
                Math.floor(x - blockRadius),
                Math.floor(y - blockRadius)],
            end: [
                Math.ceil(x + blockRadius),
                Math.ceil(y + blockRadius)],
        };
        this.forceRangeToGridRowsColumns();
        return this.gridRange;
    }

    forceRangeToGridRowsColumns() {
        if(this.gridRange.start[0] < 0) {
            this.gridRange.start[0] = 0;
        }
        if(this.gridRange.start[1] < 0) {
            this.gridRange.start[1] = 0;
        }
        if(this.gridRange.end[0] > this._columns) {
            this.gridRange.end[0] = this._columns;
        }
        if(this.gridRange.end[1] > this._rows) {
            this.gridRange.end[1] = this._rows;
        }
    }

    log() {
        if(debug.gameGridLog) {
            console.log(this.grid);
            debug.gameGridLog = false;
        }
    }

    reset() {
        this.init();
    }

    draw() {
        this.drawGrid();
        this.drawGridContent();
    }

    drawGridContent() {
        canvas.ctx.font = '10px Verdana';
        canvas.ctx.textAlign = 'left';
        canvas.ctx.fillStyle = colours.green;
        if(debug.gameGrid) {
            for(let i = 0; i < this._grid.length; i++) {
                for(let j = 0; j < this._grid[i].length; j++) {
                    for(let k = 0; k < this._grid[i][j].length; k++) {
                        const item = this._grid[i][j][k];
                        const text = item instanceof Drone ? 'Drone:' +
                            item.name : item.id;
                        canvas.ctx.fillText(text, i * this._gridBlockSize + 4,
                            j *
                            this._gridBlockSize + (10 * k + 14));
                    }
                }
            }
        }
    }

    drawGrid() {
        if(debug.gameGrid) {
            canvas.ctx.setLineDash([1, 7]);
            canvas.ctx.strokeStyle = colours.white;
            for(let i = 0; i < this._columns; i++) {
                canvas.ctx.fillText(i, i * this._gridBlockSize, 10);
                canvas.ctx.beginPath();
                canvas.ctx.moveTo(i * this._gridBlockSize, 0);
                canvas.ctx.lineTo(i * this._gridBlockSize, canvas.height);
                canvas.ctx.stroke();
            }
            for(let i = 0; i < this._rows; i++) {
                canvas.ctx.fillText(i, 0, i * this._gridBlockSize + 10);
                canvas.ctx.beginPath();
                canvas.ctx.moveTo(0, i * this._gridBlockSize);
                canvas.ctx.lineTo(canvas.width, i * this._gridBlockSize);
                canvas.ctx.stroke();
            }
            canvas.ctx.setLineDash([0]);
        }
    }
}
