import { canvasHeight, canvasWidth } from './constants';

export default class GameGrid {
    constructor() {
        this._grid = new Array(canvasWidth);
        for(let i = 0; i < this._grid.length; i++) {
            this._grid[i] = new Array(canvasHeight);
            for(let j = 0; j < this._grid.length; j++) {
                this._grid[i][j] = [];
            }
        }
    }

    get grid() {
        return this._grid;
    }

    static inArray(x, y) {
        return x >= 0 && x < canvasWidth && y >= 0 && y < canvasHeight;
    }

    addParticle(particle) {
        const x = Math.floor(particle.position.x);
        const y = Math.floor(particle.position.y);
        if(!GameGrid.inArray(x, y)) {
            return;
        }
        this._grid[x][y].push(particle);
        // console.log(x, y, this.grid[x][y]);
    }

    removeParticle(particle) {
        const x = Math.floor(particle.position.x);
        const y = Math.floor(particle.position.y);
        if(!GameGrid.inArray(x, y)) {
            return;
        }
        this._grid[x][y] = this._grid[x][y].filter((p) => p.id !== particle.id);
        // console.log(x, y, this.grid[x][y]);
    }
}