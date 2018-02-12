import ParticleManager from './manager/particle-manager';
import DroneManager from './manager/drone-manager';
import GameGrid from './game-grid';
import Debug from './dev/debug';

const canvas = document.getElementById('canvas');
export const colours = {
    black: '#2a2e34',
    white: '#b3dce2',
    orange: '#ffaa39',
    red: '#e62429',
    green: '#80bf32',
    blue: '#3b9ec7',
};
export const friction = 0.8;
export const context = canvas.getContext('2d');
export const canvasWidth = canvas.width = window.innerWidth;
export const canvasHeight = canvas.height = window.innerHeight;
export const debug = new Debug();
export const grid = new GameGrid();
export const dm = new DroneManager(canvasWidth, canvasHeight);
export const pm = new ParticleManager(canvasWidth, canvasHeight);

