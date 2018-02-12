import {
    canvasHeight,
    canvasWidth,
    context,
    debug,
    dm,
    grid,
    pm,
} from './constants';
import { deltaTime } from './service/delta-time';
import Drone from './drone';
import { gimbals, scanners, steering, thrusters } from './constants/utilities';
import { weapons } from './constants/weapons';

debug.initialiseListeners();

// const weaponsArray = [Shotgun, Uzi, Rifle];
//
// for(let i = 0; i < 10; i++) {
//
//     const gimbalOne = new Gimbal(Math.random() * Math.PI + 0.3, 0.02);
//     const gimbalTwo = new Gimbal(Math.random() * Math.PI + 0.3, 0.02);
//     const gimbalThree = new Gimbal(Math.random() * Math.PI + 0.3, 0.02);
//
//     const scannerOne = new Scanner(Math.random() * 600 + 200);
//     const scannerTwo = new Scanner(Math.random() * 600 + 200);
//     const scannerThree = new Scanner(Math.random() * 600 + 200);
//
//     const thrusterOne = new Thrust(Math.random() * 20 + 10);
//     const thrusterTwo = new Thrust(Math.random() * 20 + 10);
//     const thrusterThree = new Thrust(Math.random() * 20 + 10);
//
//     const steeringOne = new Steering(Math.random() * 0.9 + 0.4);
//     const steeringTwo = new Steering(Math.random() * 0.9 + 0.4);
//     const steeringThree = new Steering(Math.random() * 0.9 + 0.4);
//
//     const droneOne = new Drone(1, colours.blue, Math.random() *
//         canvasWidth, Math.random() *
//         canvasHeight, 0, Math.random() * Math.PI * 2, randomItem(weaponsArray),
//         gimbalOne,
//         scannerOne, thrusterOne, steeringOne);
//     const droneTwo = new Drone(2, colours.red, Math.random() *
//         canvasWidth, Math.random() *
//         canvasHeight, 0, Math.random() * Math.PI * 2, randomItem(weaponsArray),
//         gimbalTwo,
//         scannerTwo, thrusterTwo, steeringTwo);
//     const droneThree = new Drone(3, colours.green, Math.random() *
//         canvasWidth, Math.random() *
//         canvasHeight, 0, Math.random() * Math.PI * 2, randomItem(weaponsArray),
//         gimbalThree,
//         scannerThree, thrusterThree, steeringThree);
//
//     dm.addDrone(droneOne);
//     dm.addDrone(droneTwo);
//     dm.addDrone(droneThree);
// }
let fpsInterval, startTime, now, then, elapsed;

function setupDrones(data) {
    console.log(data);
    data.squadrons.map((s) => {
        s.drones.map((d) => {
            const drone = new Drone(
                d.id,
                s.id,
                d.name,
                s.colour,
                Math.random() * canvasWidth,
                Math.random() * canvasHeight,
                0,
                Math.random() * Math.PI * 2,
                weapons[d.weapon],
                gimbals[d.gimbal],
                scanners[d.scanner],
                thrusters[d.thruster],
                steering[d.steering],
            );
            dm.addDrone(drone);
        });
    });
}

fetch('./data/squads.json')
    .then(resp => resp.json())
    .then((data) => {
        setupDrones(data.data);
        startAnimating(30);
    });

function startAnimating(fps) {
    fpsInterval = 1000 / fps;
    then = Date.now();
    startTime = then;
    animate();
}

function animate() {
    context.clearRect(0, 0, canvasWidth, canvasHeight);
    context.fillStyle = '#303135';
    context.fillRect(0, 0, canvasWidth, canvasHeight);
    deltaTime.update();
    dm.update();
    pm.update();
    grid.draw();
    grid.log();
    requestAnimationFrame(animate);
    now = Date.now();
    elapsed = now - then;
    if(elapsed > fpsInterval) {
        then = now - (elapsed % fpsInterval);
    }
}
