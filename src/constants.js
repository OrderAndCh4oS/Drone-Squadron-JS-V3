import ParticleManager from './particle-manager';

const canvas = document.getElementById('canvas');
export const Context = canvas.getContext('2d');
export const canvasWidth = canvas.width = window.innerWidth;
export const canvasHeight = canvas.height = window.innerHeight;
export const pm = new ParticleManager(canvasWidth, canvasHeight);