import { canvasHeight, canvasWidth, context, pm } from './constants';
import { deltaTime } from './delta-time';
import Weapon from './weapon';

const weapon = new Weapon(10, canvasHeight / 2, 0, 1, 0.5, 0.01);

let fpsInterval, startTime, now, then, elapsed;

startAnimating(30);

function startAnimating(fps) {
    fpsInterval = 1000 / fps;
    then = Date.now();
    startTime = then;
    animate();
}

function animate() {
    context.clearRect(0, 0, canvasWidth, canvasHeight);
    context.fillStyle = '#FFD700';
    context.fillRect(0, 0, canvasWidth, canvasHeight);
    deltaTime.update();
    weapon.draw();
    weapon.update();
    pm.update();
    requestAnimationFrame(animate);
    now = Date.now();
    elapsed = now - then;
    if(elapsed > fpsInterval) {
        then = now - (elapsed % fpsInterval);
    }
}
