import { grid } from '../constants';
import Drone from '../drone';

export default class Scanner {
    constructor(radius) {
        this.radius = radius;
        this._target = null;
        this._drone = null;
    }

    get target() {
        return this._target;
    }

    hasTarget() {
        return this._target !== null;
    }

    findTarget(drone) {
        this._drone = drone;
        this._target = null;
        let nearestTarget = {target: null, distance: null};
        this.findGridRange();
        this.forceRangeToGridRowsColumns();
        for(let i = this.gridRange.start[0]; i < this.gridRange.end[0]; i++) {
            for(let j = this.gridRange.start[1]; j <
            this.gridRange.end[1]; j++) {
                grid.grid[i][j].map((item) => {
                    if(!(item instanceof Drone) || item.id === drone.id) {
                        return;
                    }
                    const distanceTo = this.distanceToTarget(item);
                    if(nearestTarget.distance === null ||
                        distanceTo < nearestTarget.distance) {
                        nearestTarget.target = item;
                        nearestTarget.distance = distanceTo;
                    }
                });
            }
        }
        if(nearestTarget.target !== null &&
            nearestTarget.distance < this.radius &&
            nearestTarget.target.health > 0) {
            this._target = nearestTarget.target;
        } else {
            this._target = null;
        }
    }

    forceRangeToGridRowsColumns() {
        if(this.gridRange.start[0] < 0) {
            this.gridRange.start[0] = 0;
        }
        if(this.gridRange.start[1] < 0) {
            this.gridRange.start[1] = 0;
        }
        if(this.gridRange.end[0] > grid.rows) {
            this.gridRange.end[0] = grid.rows;
        }
        if(this.gridRange.end[1] > grid.columns) {
            this.gridRange.end[1] = grid.columns;
        }
    }

    angleToTarget() {
        if(this.hasTarget()) {
            return Math.atan2(
                this._target.position.y - this._drone.position.y,
                this._target.position.x - this._drone.position.x,
            );
        }
        return 0;
    }

    distanceToTarget(droneTwo) {
        const dx = droneTwo.position.x - this._drone.position.x,
            dy = droneTwo.position.y - this._drone.position.y;
        return Math.sqrt(dx * dx + dy * dy);
    }

    findGridRange() {
        const x = this._drone.position.x;
        const y = this._drone.position.y;
        this.gridRange = {
            start: [
                Math.floor((x - this.radius) / grid.gridBlockSize) - 1,
                Math.floor((y - this.radius) / grid.gridBlockSize) - 1],
            end: [
                Math.round((x + this.radius) / grid.gridBlockSize) + 1,
                Math.round((y + this.radius) / grid.gridBlockSize) + 1],
        };
    }
}
