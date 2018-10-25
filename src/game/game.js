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
import request from '../api/request';
import {
    getGimbal,
    getScanner,
    getSteering,
    getThruster,
    getWeapon,
} from '../api';
import UtilitiesFactory from './factory/utilities-factory';
import GimbalFactory from './factory/gimbal-factory';
import ThrusterFactory from './factory/thruster-factory';
import SteeringFactory from './factory/steering-factory';
import ScannerFactory from './factory/scanner-factory';
import WeaponFactory from './factory/weapon-factory';

export default class Main extends Component {

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

    setupDrones(squadronJson, utilities) {
        squadronJson.map(
            s => squadrons.push(SquadronFactory.make(s, utilities)),
        );
    }

    fetchUtility(promises, get, name, factory) {
        promises.push(request(get).then(data => {
            return {[name]: UtilitiesFactory.make(factory, data)};
        }));
    }

    fetchDrones() {
        const promises = [];

        this.fetchUtility(promises, getGimbal, 'gimbals', GimbalFactory);
        this.fetchUtility(promises, getThruster, 'thrusters', ThrusterFactory);
        this.fetchUtility(promises, getSteering, 'steering', SteeringFactory);
        this.fetchUtility(promises, getScanner, 'scanners', ScannerFactory);
        this.fetchUtility(promises, getWeapon, 'weapons', WeaponFactory);

        Promise.all(promises).then(items => {
            let utilities = {};
            for(let item of items) {
                utilities = Object.assign(utilities, item);
            }
            if(utilities.hasOwnProperty('weapons') &&
                utilities.hasOwnProperty('gimbals')) {
                for(let weapon in utilities.weapons) {
                    if(utilities.weapons.hasOwnProperty(weapon)) {
                        utilities.weapons[weapon].attachGimbals(
                            utilities.gimbals);
                    }
                }
            }
            if(this.props.hasOwnProperty('squadrons'))
                this.setupDrones(this.props.squadrons, utilities);
            this.play();
        });
    }

    componentDidMount() {
        this.fetchDrones();
    }

    render() {
        return <div>
            {canvas.canvas}
            <DebugBar/>
        </div>;
    }
}

