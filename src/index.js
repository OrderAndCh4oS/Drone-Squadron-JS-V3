import { canvasHeight, canvasWidth, context, pm } from './constants';
import { deltaTime } from './delta-time';
import Weapon from './weapon';

const weapon = new Weapon(10, canvasHeight / 2, 0, 3, 0.5, 0.01);

function render() {
    context.clearRect(0, 0, canvasWidth, canvasHeight);
    context.fillStyle = '#FFD700';
    context.fillRect(0, 0, canvasWidth, canvasHeight);
    deltaTime.update();
    weapon.draw();
    weapon.update();
    pm.update();
    requestAnimationFrame(render);
}

render();