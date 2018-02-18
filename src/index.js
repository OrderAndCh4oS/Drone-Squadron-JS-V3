import {
    background,
    canvasHeight,
    canvasWidth,
    context,
    debug,
    displayGameData,
    dm,
    game,
    grid,
    pm,
    squadrons,
} from './constants/constants';
import { deltaTime } from './service/delta-time';
import DisplayData from './user-interface/display-data';
import SquadronFactory from './factory/squadron-factory';
import UI from './user-interface/ui';

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
    UI.displaySquadData();
    squadrons.map(s => {
       if(s.health <= 0) {
           game.state = 'game-over';
       }
    });
    if(game.state === 'game-over') {
        const gameOver = new DisplayData(canvasWidth / 2, canvasHeight / 2 - 40, 'green', 'center', 32);
        gameOver.addLine('Game Over');
        if(squadrons[0].health > squadrons[1].health) {
            gameOver.addLine(squadrons[0].name + ' Wins')
        } else if (squadrons[1].health > squadrons[0].health) {
            gameOver.addLine(squadrons[1].name + ' Wins')
        } else {
            gameOver.addLine('Draw')
        }
        gameOver.draw();
    }
    requestAnimationFrame(animate);
    now = Date.now();
    elapsed = now - then;
    if(elapsed > fpsInterval) {
        then = now - (elapsed % fpsInterval);
    }
}
