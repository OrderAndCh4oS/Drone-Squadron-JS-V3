import React, { Component } from 'react';
import {
    background,
    droneManager,
    grid,
    particleManager,
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
    putEndOfGameUpdate, putSquadron,
} from '../api';
import UtilitiesFactory from './factory/utilities-factory';
import GimbalFactory from './factory/gimbal-factory';
import ThrusterFactory from './factory/thruster-factory';
import SteeringFactory from './factory/steering-factory';
import ScannerFactory from './factory/scanner-factory';
import WeaponFactory from './factory/weapon-factory';
import RoundTypeFactory from './factory/round-type-factory';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core';
import { connect } from 'react-redux';
import { endOfGameUpdate } from '../store/drones/actions';
import { updateSquadron } from '../store/squadrons/actions';

const styles = theme => ({
    button: {
        marginBottom: theme.spacing.unit,
    },
});

class Main extends Component {
    updated = false;

    state = {
        playing: false,
        gameOver: false,
        winner: false,
    };

    play = () => {
        this.updated = false;
        this.fpsInterval = 1000 / 60;
        this.then = Date.now();
        this.startTime = this.then;
        this.elapsed = 0;
        this.musicManager = new MusicManager();
        this.setState({playing: true});
    };

    animate = () => {
        if(this.state.playing) {
            const now = Date.now();
            this.elapsed = now - this.then;
            if(this.elapsed > this.fpsInterval) {
                this.then = Date.now();
                this.draw();
            }
            requestAnimationFrame(this.animate);
        }
    };

    draw = () => {
        background.draw();
        deltaTime.update();
        droneManager.update();
        particleManager.update();
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
            const winner = this.getWinner();
            this.musicManager.stop();
            new GameOver().draw(this.state.winner);
            this.updateSquadrons();
            this.setState({
                winner,
                gameOver: true,
            });
        }
    };

    getWinner = () => {
        let winner;
        if(squadrons[0].health > squadrons[1].health) {
            winner = squadrons[0];
        } else if(squadrons[1].health > squadrons[0].health) {
            winner = squadrons[1];
        } else {
            winner = false;
        }
        return winner;
    };

    updateSquadrons = () => {
        if(this.updated) return;
        this.updated = true;
        squadrons.map(squadron => {
            const winner = this.getWinner();
            const roundBonus = winner ? winner.id === squadron.id ? 250 : 125 : 150;
            const killBonus = squadron.drones.reduce((bonus, d) => bonus + (d.kills * 25), 0);
            request(putSquadron,{id: squadron.id}, {
                scrap: squadron.scrap + roundBonus + killBonus
            }).then(data => {
                return this.props.updateSquadron({
                    id: Number(data.id_1),
                    scrap: data.scrap,
                });
            });
            return squadron.drones.map(
                drone => {
                    let status;
                    const finalHealth = drone.health.currentHealth;
                    switch(true) {
                        case finalHealth <= 0:
                            status = 'destroyed';
                            break;
                        case finalHealth < 33:
                            status = 'damaged';
                            break;
                        default:
                            status = 'ready';
                    }
                    request(
                        putEndOfGameUpdate,
                        {id: drone.id},
                        {kills: drone.kills, status},
                    ).then(data => {
                        this.props.endOfGameUpdate(
                            drone.id,
                            data.missions,
                            data.kills,
                            data.status,
                        );
                    });
                },
            );
        },
        );
    };

    endGame = () => {
        this.setState({playing: false});
        squadrons.shift();
        squadrons.shift();
        droneManager.reset();
        particleManager.reset();
        grid.reset();
        this.props.endGame();
    };

    fetchDrones = () => {
        Promise.all([
            this.fetchUtility(getGimbal, 'gimbals', GimbalFactory),
            this.fetchUtility(getThruster, 'thrusters', ThrusterFactory),
            this.fetchUtility(getSteering, 'steering', SteeringFactory),
            this.fetchUtility(getScanner, 'scanners', ScannerFactory),
            this.fetchUtility(getWeapon, 'weapons', WeaponFactory),
            this.fetchUtility(getRoundType, 'roundTypes', RoundTypeFactory),
        ]).then(items => {
            let utilities = {};
            for(let item of items) {
                utilities = Object.assign(utilities, item);
            }
            if(this.props.hasOwnProperty('squadrons')) {
                this.setupDrones(this.props.squadrons, utilities);
            }
            this.play();
            this.animate();
        });
    };

    fetchUtility = (getUtility, name, factory) =>
        request(getUtility).then(
            data => ({[name]: UtilitiesFactory.make(factory, data)}),
        );

    setupDrones = (squadronJson, utilities) =>
        squadronJson.map(
            s => squadrons.push(SquadronFactory.make(s, utilities)),
        );

    componentDidMount() {
        this.fetchDrones();
    }

    componentWillUnmount() {
        this.endGame();
    }

    render() {
        const {classes} = this.props;
        return <div>
            {canvas.canvas}
            {
                !this.state.gameOver
                    ? <DebugBar/>
                    : <div>
                        <Button
                            variant='contained'
                            color='primary'
                            className={classes.button}
                            onClick={this.endGame}
                        >Finish</Button>
                    </div>
            }
        </div>;
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        ...state,
        ...ownProps,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        endOfGameUpdate: (id, missions, kills, status) => dispatch(
            endOfGameUpdate(id, missions, kills, status),
        ),
        updateSquadron: (squadron) => dispatch(updateSquadron(squadron)),
    };
};

export default withStyles(styles)(
    connect(mapStateToProps, mapDispatchToProps)(Main),
);
