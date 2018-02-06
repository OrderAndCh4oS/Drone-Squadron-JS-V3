import { canvasWidth } from './constants';

export default class GameGrid {
    constructor() {
        this._rows = Math.floor(canvasWidth / 10);
        this._columns = Math.floor(canvasWidth / 10);
        this._grid = new Array(this._rows);
        for(let i = 0; i < this._grid.length; i++) {
            this._grid[i] = new Array(this._columns);
            for(let j = 0; j < this._grid.length; j++) {
                this._grid[i][j] = [];
            }
        }
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
        return x >= 0 && x < this._rows && y >= 0 && y < this._columns;
    }

    addParticle(particle, x, y) {
        if(!this.gridHasKeys(x, y)) {
            return;
        }
        console.log(1);
        this._grid[x][y].push(particle);
    }

    removeParticle(particle, x, y) {
        if(!this.gridHasKeys(x, y)) {
            return;
        }
        this._grid[x][y] = this._grid[x][y].filter((p) => p.id !== particle.id);
    }
}