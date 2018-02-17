import {
    allDrones,
    background,
    canvasHeight,
    canvasWidth, colours,
    context,
    debug,
    dm,
    grid,
    pm,
} from './constants';
import { deltaTime } from './service/delta-time';
import DroneFactory from './factory/droneFactory';
import DisplayData from './service/display-data';

let fpsInterval, startTime, now, then, elapsed;

debug.initialiseListeners();

fetch('./data/squads.json')
    .then(resp => resp.json())
    .then((data) => {
        setupDrones(data.data);
        startAnimating(60);
    });

function setupDrones(data) {
    const s1 = data.squadrons[0];
    const s2 = data.squadrons[1];
    for(let i = 0; i < s1.drones.length; i++) {
        dm.addDrone(DroneFactory.make(s1.drones[i], s1));
        dm.addDrone(DroneFactory.make(s2.drones[i], s2));
    }
}

function startAnimating(fps) {
    fpsInterval = 1000 / fps;
    then = Date.now();
    startTime = then;
    animate();
}

function squadKillCount(squadId) {
    return allDrones
        .map(d => d.squadId === squadId ? d.kills : 0)
        .reduce((a, b) => a + b);
}

function animate() {
    context.clearRect(0, 0, canvasWidth, canvasHeight);
    context.fillStyle = '#242526';
    context.fillRect(0, 0, canvasWidth, canvasHeight);
    background.draw();
    deltaTime.update();
    dm.update();
    pm.update();
    grid.draw();
    grid.log();
    if(debug.gameDataToggle) {
        const displaySquadData = new DisplayData(10, 10, 'green');
        displaySquadData.addLine('Squad One Kills: ' + squadKillCount(1));
        displaySquadData.addLine('Squad Two Kills: ' + squadKillCount(2));
        displaySquadData.draw();
    }
    requestAnimationFrame(animate);
    now = Date.now();
    elapsed = now - then;
    if(elapsed > fpsInterval) {
        then = now - (elapsed % fpsInterval);
    }
}
