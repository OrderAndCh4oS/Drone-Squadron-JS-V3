import {
    allDrones,
    background,
    canvasHeight,
    canvasWidth,
    colours,
    context,
    debug,
    dm,
    grid,
    pm,
} from './constants';
import { deltaTime } from './service/delta-time';
import DroneFactory from './factory/droneFactory';
import DisplayData from './service/display-data';
import PercentBox from './user-interface/percentBox';

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

function squadHealth(squadId) {
    return allDrones
        .map(d => {
            if(d.squadId !== squadId) {
                return 0;
            }
            return d.health.currentHealth > 0 ? d.health.currentHealth : 0;
        })
        .reduce((a, b) => a + b);
}

function squadStartHealth(squadId) {
    return allDrones
        .map(d => d.squadId === squadId ? d.health.health : 0)
        .reduce((a, b) => a + b);
}

function drawSquadHealth() {
    const squadOneHealthBar = new PercentBox(canvasWidth / 2, 20, canvasWidth *
        0.9, 20, colours.blue, colours.white);
    const squadTwoHealthBar = new PercentBox(canvasWidth / 2, 50, canvasWidth *
        0.9, 20, colours.red, colours.white);
    squadOneHealthBar.setPercentage(squadHealth(1), squadStartHealth(1));
    squadTwoHealthBar.setPercentage(squadHealth(2), squadStartHealth(2));
    squadOneHealthBar.draw();
    squadTwoHealthBar.draw();

}

function animate() {
    context.clearRect(0, 0, canvasWidth, canvasHeight);
    context.fillStyle = '#242526';
    context.fillRect(0, 0, canvasWidth, canvasHeight);
    background.draw();
    if(squadHealth(1) <= 0 || squadHealth(2) <= 0) {
        return;
    }
    deltaTime.update();
    dm.update();
    pm.update();
    grid.draw();
    grid.log();
    drawSquadHealth();
    if(debug.gameDataToggle) {
        const displaySquadData = new DisplayData(10, 100, 'green');
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
