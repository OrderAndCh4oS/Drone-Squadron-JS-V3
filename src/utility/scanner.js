import { colours, context, debug, grid } from '../constants';
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
                    if(!(item instanceof Drone) ||
                        item.squadId === drone.squadId) {
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
            nearestTarget.distance <= this.radius &&
            nearestTarget.target.health.health > 0) {
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
        if(this.gridRange.end[0] > grid.columns) {
            this.gridRange.end[0] = grid.columns;
        }
        if(this.gridRange.end[1] > grid.rows) {
            this.gridRange.end[1] = grid.rows;
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
        const x = this._drone.position.x / grid.gridBlockSize;
        const y = this._drone.position.y / grid.gridBlockSize;
        const blockRadius = (this.radius / grid.gridBlockSize) + 2;
        this.gridRange = {
            start: [
                Math.floor(x - blockRadius),
                Math.floor(y - blockRadius)],
            end: [
                Math.ceil(x + blockRadius),
                Math.ceil(y + blockRadius)],
        };
    }

    draw(drone) {
        if(this.hasTarget()) {
            context.translate(this.target.position.x,
                this.target.position.y);
            context.beginPath();
            context.moveTo(-5, -5);
            context.lineTo(5, 5);
            context.moveTo(5, -5);
            context.lineTo(-5, 5);
            context.strokeStyle = drone.color;
            context.strokeWidth = 5;
            context.stroke();
            context.resetTransform();
            this.drawScannerPath(drone);
        }
        this.drawScannerRadius(drone);
    }

    drawScannerPath(drone) {
        if(debug.scannerPathToggle) {
            context.setLineDash([1, 5]);
            context.beginPath();
            context.moveTo(drone.position.x, drone.position.y);
            context.lineTo(this.target.position.x,
                this.target.position.y);
            context.strokeStyle = colours.black;
            context.stroke();
            context.setLineDash([0]);
        }
    }

    drawScannerRadius(drone) {
        if(debug.scannerRadiusToggle) {
            context.setLineDash([1, 5]);
            context.beginPath();
            context.arc(
                drone.position.x,
                drone.position.y,
                this.radius,
                0,
                2 * Math.PI);
            context.strokeStyle = colours.black;
            context.stroke();
            context.setLineDash([0]);
        }
    }
}
