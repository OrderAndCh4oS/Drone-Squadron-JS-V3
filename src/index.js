import {
    background,
    debug,
    displayGameData,
    dm,
    game,
    grid,
    pm,
    squadrons,
} from './constants/constants';
import { deltaTime } from './service/delta-time';
import SquadronFactory from './factory/squadron-factory';
import UI from './user-interface/ui';
import GameOver from './user-interface/display-game-over';

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

function setFrameTimeData() {
    now = Date.now();
    elapsed = now - then;
    if(elapsed > fpsInterval) {
        then = now - (elapsed % fpsInterval);
    }
}

function animate() {
    background.draw();
    deltaTime.update();
    dm.update();
    pm.update();
    grid.draw();
    grid.log();
    UI.displaySquadData();
    squadrons.map(s => {
        if(s.health <= 0) {
            game.state = 'game-over';
        }
    });
    if(game.state === 'game-over') {
        new GameOver().draw();
    }
    requestAnimationFrame(animate);
    setFrameTimeData();
}
