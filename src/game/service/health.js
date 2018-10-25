import canvas from '../service/canvas';
import { colours } from '../constants/constants';
import PercentBox from '../user-interface/percent-box';

export default class Health extends PercentBox {
    constructor(health) {
        super(0, 16, 16, 4, colours.green, colours.white);
        this._health = health;
        this._currentHealth = health;
    }

    get health() {
        return this._health;
    }

    get currentHealth() {
        return this._currentHealth;
    }

    takeDamage(damage) {
        this._currentHealth = +(this._currentHealth - damage).toFixed(2);
    }

    repairDamage(value) {
        if(this._currentHealth + value < this._health) {
            this._currentHealth += value;
        } else {
            this._currentHealth = this._health;
        }
    }

    draw(drone) {
        canvas.ctx.translate(drone.position.x, drone.position.y);
        this.setPercentage(this._currentHealth, this._health);
        this._fill = this._currentHealth <= 20 ? colours.red : colours.green;
        super.draw();
    }
}
