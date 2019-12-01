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

export const friction = 0.7;

export const debug = new Debug();
export const background = new Background();
export const grid = new GameGrid();
export const squadrons = [];
export const droneManager = new DroneManager();
export const particleManager = new ParticleManager();

