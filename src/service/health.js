import { colours, context } from '../constants';

export default class Heath {
    constructor(health) {
        this._health = health;
        console.log('_health');
    }

    get health() {
        return this._health;
    }

    takeDamage(damage) {
        this._health -= damage;
    }

    repairDamage(value) {
        this._health += value;
    }

    draw(drone) {
        context.translate(drone.position.x, drone.position.y);
        context.translate(-8, 16);
        this.drawHealthBox(this.health);
        context.fillStyle = this._health > 15 ? colours.green : colours.red;
        context.fill();
        this.drawHealthBox();
        context.strokeStyle = colours.black;
        context.stroke();
        context.resetTransform();
    }

    drawHealthBox(width = 100) {
        context.beginPath();
        context.moveTo(0, 0);
        context.lineTo(12 * width / 100, 0);
        context.lineTo(12 * width / 100, 4);
        context.lineTo(0, 4);
        context.lineTo(0, 0);
    }
}
