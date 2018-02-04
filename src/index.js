import { canvasHeight, canvasWidth, context, dm, pm } from './constants';
import { deltaTime } from './service/delta-time';
import Drone from './drone';
import Shotgun from './weapon/shotgun';
import Uzi from './weapon/uzi';
import Rifle from './weapon/rifle';

const droneOne = new Drone(10, canvasHeight / 2, 10, 0, Shotgun);
const droneTwo = new Drone(canvasWidth / 3, canvasHeight - 10, 10, -Math.PI / 2,
    Uzi);
const droneThree = new Drone(canvasWidth / 2, 20, 10, Math.PI / 2, Rifle);

dm.addDrone(droneOne);
dm.addDrone(droneTwo);
dm.addDrone(droneThree);

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
    dm.update();
    pm.update();
    requestAnimationFrame(animate);
    now = Date.now();
    elapsed = now - then;
    if(elapsed > fpsInterval) {
        then = now - (elapsed % fpsInterval);
    }
}
