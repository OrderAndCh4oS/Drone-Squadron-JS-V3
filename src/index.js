import {
    background,
    canvasHeight,
    canvasWidth,
    context,
    debug,
    displayGameData,
    dm,
    grid,
    pm,
    squadrons,
} from './constants';
import { deltaTime } from './service/delta-time';
import DisplayData from './service/display-data';
import SquadronFactory from './factory/squadron-factory';

let fpsInterval, startTime, now, then, elapsed;

debug.initialiseListeners();

fetch('./data/squads.json')
    .then(resp => resp.json())
    .then((data) => {
        setupDrones(data.data);
        startAnimating(60);
    });

function setupDrones(data) {
    data.squadrons.map(s => squadrons.push(SquadronFactory.make(s)));
}

function startAnimating(fps) {
    fpsInterval = 1000 / fps;
    then = Date.now();
    startTime = then;
    animate();
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
    squadrons.map((s, i) => {
        s.drawHealth(i);
        const displaySquadData = new DisplayData(
            canvasWidth / 4 * (i * 2 + 1),
            40,
            s.colour,
            'center'
        );
        displaySquadData.addLine(s.name);
        displaySquadData.addLine(`Kills: ${s.kills}`);
        displaySquadData.draw();
    });
    requestAnimationFrame(animate);
    now = Date.now();
    elapsed = now - then;
    if(elapsed > fpsInterval) {
        then = now - (elapsed % fpsInterval);
    }
}
