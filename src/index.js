import {
    background,
    debug,
    displayGameData,
    dm,
    game,
    grid,
    pm,
    squadrons,
} from './game/constants/constants';
import { deltaTime } from './game/service/delta-time';
import SquadronFactory from './game/factory/squadron-factory';
import UI from './game/user-interface/ui';
import GameOver from './game/user-interface/display-game-over';
import MusicManager from './game/manager/music-manager';

debug.initialiseListeners();

export default class Main {
    constructor(fps) {
        this.fpsInterval = 1000 / fps;
        this.then = Date.now();
        this.startTime = this.then;
        this.elapsed = 0;
        this.animate = this.animate.bind(this);
        this.musicManager = new MusicManager();
    }

    animate() {
        const now = Date.now();
        this.elapsed = now - this.then;
        if(this.elapsed > this.fpsInterval) {
            this.then = Date.now();
            this.draw();
        }
        requestAnimationFrame(this.animate);
    }

    draw() {
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
    }
}

fetch('./data/squads.json')
    .then(resp => resp.json())
    .then((data) => {
        setupDrones(data.data);
        const main = new Main(60);
        main.animate();
    });

function setupDrones(data) {
    data.squadrons.map(s => squadrons.push(SquadronFactory.make(s)));
}
