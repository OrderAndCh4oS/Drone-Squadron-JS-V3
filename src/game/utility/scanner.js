import canvas from '../service/canvas';
import { colours, debug, grid } from '../constants/constants';
import Drone from '../drone';
import Bullet from '../abstract/bullet';
import { angleTo } from '../functions';

export default class Scanner {
    constructor(radius) {
        this.radius = radius;
        this._target = null;
        this._drone = null;
        this._threats = 0;
    }

    get threats() {
        return this._threats;
    }

    get target() {
        return this._target;
    }

    hasTarget() {
        return this._target !== null;
    }

    scanArea(drone) {
        this._threats = 0;
        this._drone = drone;
        this._target = null;
        this.nearestTarget = {target: null, distance: null};
        this.gridRange = grid.findGridRange(drone, this.radius);
        this.scanGridRange(drone, this.nearestTarget);
        this.selectTargetIfValid();
    }

    scanGridRange() {
        for(let i = this.gridRange.start[0]; i < this.gridRange.end[0]; i++) {
            for(let j = this.gridRange.start[1]; j <
            this.gridRange.end[1]; j++) {
                grid.grid[i][j].map((item) => {
                    this.detectThreats(item);
                    this.findNearestDrone(item);
                });
            }
        }
    }

    detectThreats(item) {
        const angleToItem = angleTo(item.angle,
            this.angleToParticle(item));
        if(
            (item instanceof Bullet) &&
            item.squadId !== this._drone.squadId &&
            this.distanceToParticle(item) < 300 &&
            (angleToItem <= 0.15 || angleToItem >= -0.15)
        ) {
            this._threats++;
        }
    }

    selectTargetIfValid() {
        if(this.nearestTarget.target !== null &&
            this.nearestTarget.distance <= this.radius &&
            this.nearestTarget.target.health.currentHealth > 0) {
            this._target = this.nearestTarget.target;
        } else {
            this._target = null;
        }
    }

    findNearestDrone(item) {
        if((item instanceof Drone) && item.squadId !== this._drone.squadId) {
            const distanceTo = this.distanceToParticle(item);
            if(this.nearestTarget.distance === null ||
                distanceTo < this.nearestTarget.distance) {
                this.nearestTarget.target = item;
                this.nearestTarget.distance = distanceTo;
            }
        }
    }

    angleToTarget() {
        return this.hasTarget() ? this.angleToParticle(this._target) : 0;
    }

    angleToParticle(particle) {
        return Math.atan2(
            particle.position.y - this._drone.position.y,
            particle.position.x - this._drone.position.x,
        );
    }

    distanceToParticle(particleTwo) {
        const dx = particleTwo.position.x - this._drone.position.x,
            dy = particleTwo.position.y - this._drone.position.y;
        return Math.sqrt(dx * dx + dy * dy);
    }

    draw(drone) {
        if(this.hasTarget()) {
            canvas.ctx.translate(this.target.position.x,
                this.target.position.y);
            canvas.ctx.beginPath();
            canvas.ctx.moveTo(-5, -5);
            canvas.ctx.lineTo(5, 5);
            canvas.ctx.moveTo(5, -5);
            canvas.ctx.lineTo(-5, 5);
            canvas.ctx.strokeStyle = drone.colour;
            canvas.ctx.strokeWidth = 5;
            canvas.ctx.stroke();
            canvas.ctx.resetTransform();
            this.drawScannerPath(drone);
        }
        this.drawScannerRadius(drone);
    }

    drawScannerPath(drone) {
        if(debug.scannerPath) {
            canvas.ctx.setLineDash([1, 5]);
            canvas.ctx.beginPath();
            canvas.ctx.moveTo(drone.position.x, drone.position.y);
            canvas.ctx.lineTo(this.target.position.x,
                this.target.position.y);
            canvas.ctx.strokeStyle = colours.white;
            canvas.ctx.stroke();
            canvas.ctx.setLineDash([0]);
        }
    }

    drawScannerRadius(drone) {
        if(debug.scannerRadius) {
            canvas.ctx.setLineDash([1, 5]);
            canvas.ctx.beginPath();
            canvas.ctx.arc(
                drone.position.x,
                drone.position.y,
                this.radius,
                0,
                2 * Math.PI);
            canvas.ctx.strokeStyle = colours.white;
            canvas.ctx.stroke();
            canvas.ctx.setLineDash([0]);
        }
    }
}
