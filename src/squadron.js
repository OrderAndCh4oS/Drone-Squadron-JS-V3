import { canvasWidth, colours } from './constants';
import PercentBox from './user-interface/percentBox';

export default class Squadron {
    constructor(id, name, colour) {
        this.id = id;
        this._name = name;
        this.colour = colour;
        this.drones = [];
    }

    get name() {
        return this._name;
    }

    addDrone(drone) {
        this.drones.push(drone);
    }

    killCount() {
        return this.drones
            .map(d => d.kills)
            .reduce((a, b) => a + b);
    }

    health() {
        return this.drones
            .map(d => d.health.currentHealth > 0 ? d.health.currentHealth : 0)
            .reduce((a, b) => a + b);
    }

    startHealth() {
        return this.drones.map(d => d.health.health).reduce((a, b) => a + b);
    }

    drawHealth(index) {
        const healthBar = new PercentBox(
            canvasWidth / 2,
            24 * (index + 1),
            canvasWidth * 0.9,
            14,
            colours[this.colour],
            colours.white,
        );
        healthBar.setPercentage(this.health(), this.startHealth());
        healthBar.draw();
    }
}