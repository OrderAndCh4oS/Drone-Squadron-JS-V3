import { canvasHeight, canvasWidth, context, dm, pm } from './constants';
import { deltaTime } from './service/delta-time';
import Drone from './drone';
import Shotgun from './weapon/shotgun';
import Uzi from './weapon/uzi';
import Rifle from './weapon/rifle';
import Gimbal from './utility/gimbal';
import Scanner from './utility/scanner';
import Steering from './utility/steering';
import Thrust from './utility/thruster';

for(let i = 0; i < 5; i++) {

    const gimbalOne = new Gimbal(Math.random() * 0.9 + 0.3, 0.01);
    const gimbalTwo = new Gimbal(Math.random() * 0.9 + 0.3, 0.01);
    const gimbalThree = new Gimbal(Math.random() * 0.9 + 0.3, 0.01);

    const scannerOne = new Scanner(Math.random() * 600 + 400);
    const scannerTwo = new Scanner(Math.random() * 600 + 400);
    const scannerThree = new Scanner(Math.random() * 600 + 400);

    const thrusterOne = new Thrust(Math.random() * 40 + 20);
    const thrusterTwo = new Thrust(Math.random() * 40 + 20);
    const thrusterThree = new Thrust(Math.random() * 40 + 20);

    const steeringOne = new Steering(Math.random() * 0.8 + 0.6);
    const steeringTwo = new Steering(Math.random() * 0.8 + 0.6);
    const steeringThree = new Steering(Math.random() * 0.8 + 0.6);

    const droneOne = new Drone(1, '#345b77', Math.random() *
        canvasWidth, Math.random() *
        canvasHeight, 0, Math.random() * Math.PI * 2, Shotgun, gimbalOne,
        scannerOne, thrusterOne, steeringOne);
    const droneTwo = new Drone(2, '#cd4535', Math.random() *
        canvasWidth, Math.random() *
        canvasHeight, 0, Math.random() * Math.PI * 2, Uzi, gimbalTwo,
        scannerTwo, thrusterTwo, steeringTwo);
    const droneThree = new Drone(3, '#80bf32', Math.random() *
        canvasWidth, Math.random() *
        canvasHeight, 0, Math.random() * Math.PI * 2, Rifle, gimbalThree,
        scannerThree, thrusterThree, steeringThree);

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
