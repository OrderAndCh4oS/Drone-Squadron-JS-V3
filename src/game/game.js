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
    getRoundType,
    getScanner,
    getSteering,
    getThruster,
    getWeapon,
    postSquadron,
} from '../api';
import UtilitiesFactory from './factory/utilities-factory';
import GimbalFactory from './factory/gimbal-factory';
import ThrusterFactory from './factory/thruster-factory';
import SteeringFactory from './factory/steering-factory';
import ScannerFactory from './factory/scanner-factory';
import WeaponFactory from './factory/weapon-factory';
import RoundTypeFactory from './factory/round-type-factory';

export default class Main extends Component {

    state = {
        gameOver: false,
        winner: false,
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
                this.setState({
                    gameOver: true,
                });
            }
        });
        if(this.state.gameOver) {
            this.setWinner();
            this.musicManager.stop();
            new GameOver().draw(this.state.winner);
            // this.updateSquadrons();
        }
    };

    setWinner = () => {
        let winner;
        if(squadrons[0].health > squadrons[1].health) {
            winner = squadrons[0];
        } else if(squadrons[1].health > squadrons[0].health) {
            winner = squadrons[1];
        } else {
            winner = false;
        }
        this.setState({winner});
    };

    updateSquadrons = () => {
        squadrons.map(squadron => {
            request(postSquadron({}));
        });
    };

    fetchDrones() {
        const promises = [];

        this.fetchUtility(promises, getGimbal, 'gimbals', GimbalFactory);
        this.fetchUtility(promises, getThruster, 'thrusters', ThrusterFactory);
        this.fetchUtility(promises, getSteering, 'steering', SteeringFactory);
        this.fetchUtility(promises, getScanner, 'scanners', ScannerFactory);
        this.fetchUtility(promises, getWeapon, 'weapons', WeaponFactory);
        this.fetchUtility(promises, getRoundType, 'roundTypes',
            RoundTypeFactory);

        Promise.all(promises).then(items => {
            let utilities = {};
            for(let item of items) {
                utilities = Object.assign(utilities, item);
            }
            console.log(utilities);
            if(this.props.hasOwnProperty('squadrons')) {
                this.setupDrones(this.props.squadrons, utilities);
            }
            this.play();
        });
    }

    fetchUtility(promises, get, name, factory) {
        promises.push(request(get).then(data => {
            return {[name]: UtilitiesFactory.make(factory, data)};
        }));
    }

    setupDrones(squadronJson, utilities) {
        squadronJson.map(
            s => squadrons.push(SquadronFactory.make(s, utilities)),
        );
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
