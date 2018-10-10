import React, { Component } from 'react';
import {
    background,
    dm,
    game,
    grid,
    pm,
    squadrons,
} from './constants/constants';
import { deltaTime } from './service/delta-time';
import UI from './user-interface/ui';
import SquadronFactory from './factory/squadron-factory';
import GameOver from './user-interface/display-game-over';
import MusicManager from './manager/music-manager';
import canvas from './service/canvas';
import DebugBar from './components/debug-bar';

export default class Main extends Component {

    fetchData = () => {
        fetch('./data/squads.json')
            .then(resp => resp.json())
            .then((data) => {
                this.setupDrones(data.data);
                this.play();
            });
    };
    play = () => {
        this.fpsInterval = 1000 / 60;
        this.then = Date.now();
        this.startTime = this.then;
        this.elapsed = 0;
        this.musicManager = new MusicManager();
        this.animate();
    };
    animate = () => {
        const now = Date.now();
        this.elapsed = now - this.then;
        if(this.elapsed > this.fpsInterval) {
            this.then = Date.now();
            this.draw();
        }
        requestAnimationFrame(this.animate);
    };
    draw = () => {
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
            this.musicManager.stop();
            new GameOver().draw();
        }
    };

    constructor(props) {
        super(props);
    }

    setupDrones(data) {
        if(data.hasOwnProperty('squadrons'))
            data.squadrons.map(s => squadrons.push(SquadronFactory.make(s)));
    }

    componentDidMount() {
        this.fetchData();
    }

    render() {
        return <div>
            {canvas.canvas}
            <DebugBar/>
        </div>;
    }
}

