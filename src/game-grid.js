import { canvasWidth } from './constants';

export default class GameGrid {
    constructor() {
        this.rows = Math.floor(canvasWidth / 10);
        this.columns = Math.floor(canvasWidth / 10);
        this._grid = new Array(this.rows);
        for(let i = 0; i < this._grid.length; i++) {
            this._grid[i] = new Array(this.columns);
            for(let j = 0; j < this._grid.length; j++) {
                this._grid[i][j] = [];
            }
        }
    }

    get grid() {
        return this._grid;
    }

    static inArray(x, y) {
        return x >= 0 && x < this.rows && y >= 0 && y < this.columns;
    }

    addParticle(particle, x, y) {
        if(!GameGrid.inArray(x, y)) {
            return;
        }
        this._grid[x][y].push(particle);
        // console.log(x, y, this.grid[x][y]);
    }

    removeParticle(particle, x, y) {
        if(!GameGrid.inArray(x, y)) {
            return;
        }
        this._grid[x][y] = this._grid[x][y].filter((p) => p.id !== particle.id);
        // console.log(x, y, this.grid[x][y]);
    }
}