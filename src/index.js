import ParticleManager from './particle-manager';
import { deltaTime } from './delta-time';
import Weapon from './weapon';

const canvas = document.getElementById('canvas');
let ctx = canvas.getContext('2d');
const width = canvas.width = window.innerWidth;
const height = canvas.height = window.innerHeight;
let pm = new ParticleManager(width, height);

const weapon = new Weapon(10, height / 2, 0, pm);

function turn(weapon) {
    switch(true) {
        case weapon.rotation === 'right' && weapon.angle < 0.4:
            weapon.angle += 0.01;
            break;
        case weapon.rotation === 'left' && weapon.angle > -0.4:
            weapon.angle -= 0.01;
            break;
        case weapon.rotation === 'right' && weapon.angle > 0.4:
            weapon.rotation = 'left';
            break;
        case weapon.rotation === 'left' && weapon.angle < -0.4:
            weapon.rotation = 'right';
            break;
    }
}

function render() {
    ctx.clearRect(0, 0, width, height);
    ctx.fillStyle = '#FFD700';
    ctx.fillRect(0, 0, width, height);
    deltaTime.update();
    turn(weapon);
    weapon.draw(ctx);
    weapon.update();
    pm.update(ctx);
    requestAnimationFrame(render);
}

render();