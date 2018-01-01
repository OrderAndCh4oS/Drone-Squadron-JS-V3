import { canvasHeight, canvasWidth, Context, pm } from './constants';
import { deltaTime } from './delta-time';
import Weapon from './weapon';

const weapon = new Weapon(10, canvasHeight / 2, 0, 3, 0.5, 0.01);

function render() {
    Context.clearRect(0, 0, canvasWidth, canvasHeight);
    Context.fillStyle = '#FFD700';
    Context.fillRect(0, 0, canvasWidth, canvasHeight);
    deltaTime.update();
    weapon.draw();
    weapon.update();
    pm.update();
    requestAnimationFrame(render);
}

render();