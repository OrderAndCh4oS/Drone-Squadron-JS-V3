import { canvasHeight, canvasWidth, context, pm } from './constants';
import { deltaTime } from './delta-time';
import Drone from './drone';

const drone = new Drone(10, canvasHeight / 2, 10, 0);

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
    drone.draw();
    drone.update();
    pm.update();
    requestAnimationFrame(animate);
    now = Date.now();
    elapsed = now - then;
    if(elapsed > fpsInterval) {
        then = now - (elapsed % fpsInterval);
    }
}
