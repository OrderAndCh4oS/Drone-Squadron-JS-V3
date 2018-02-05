import ParticleManager from './manager/particle-manager';
import DroneManager from './manager/drone-manager';
import GameGrid from './game-grid';

const canvas = document.getElementById('canvas');
export const context = canvas.getContext('2d');
export const canvasWidth = canvas.width = window.innerWidth;
export const canvasHeight = canvas.height = window.innerHeight;
export const grid = new GameGrid();
export const dm = new DroneManager(canvasWidth, canvasHeight);
export const pm = new ParticleManager(canvasWidth, canvasHeight);