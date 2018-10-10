import React from 'react';
import ParticleManager from '../manager/particle-manager';
import DroneManager from '../manager/drone-manager';
import GameGrid from '../user-interface/game-grid';
import Debug from '../dev/debug';
import Background from '../service/background';

export const colours = {
    black: '#2a2e34',
    white: '#b3dce2',
    orange: '#ffaa39',
    red: '#e62429',
    green: '#80bf32',
    blue: '#3b9ec7',
};

export const game = {state: 'playing'};
export const friction = 0.8;

export const debug = new Debug();
export const background = new Background();
export const grid = new GameGrid();
export const squadrons = [];
export const dm = new DroneManager();
export const pm = new ParticleManager();

