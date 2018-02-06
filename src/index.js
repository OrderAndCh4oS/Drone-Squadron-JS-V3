import { canvasHeight, canvasWidth, context, dm, pm } from './constants';
import { deltaTime } from './service/delta-time';
import Drone from './drone';
import Shotgun from './weapon/shotgun';
import Uzi from './weapon/uzi';
import Rifle from './weapon/rifle';
import Gimbal from './utility/gimbal';
import Scanner from './abstract/scanner';

for(let i = 0; i < 5; i++) {

    const gimbalOne = new Gimbal(0, 0);
    const gimbalTwo = new Gimbal(0.2, 0.01);
    const gimbalThree = new Gimbal(0.4, 0.01);

    const scannerOne = new Scanner(100);
    const scannerTwo = new Scanner(100);
    const scannerThree = new Scanner(100);

    const droneOne = new Drone(1, '#777', Math.random() *
        canvasWidth, Math.random() *
        canvasHeight, 12, Math.random() * Math.PI * 2, Shotgun, gimbalOne,
        scannerOne);
    const droneTwo = new Drone(2, '#444', Math.random() *
        canvasWidth, Math.random() *
        canvasHeight, 8, Math.random() * Math.PI * 2, Uzi, gimbalTwo,
        scannerTwo);
    const droneThree = new Drone(3, '#222', Math.random() *
        canvasWidth, Math.random() *
        canvasHeight, 15, Math.random() * Math.PI * 2, Rifle, gimbalThree,
        scannerThree);

    dm.addDrone(droneOne);
    dm.addDrone(droneTwo);
    dm.addDrone(droneThree);
}

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
