import ParticleManager from './particle-manager';
import {deltaTime} from './delta-time';
import Bullet from './bullet';
import Weapon from './weapon';

const canvas = document.getElementById('canvas');
let ctx = canvas.getContext('2d');
const width = canvas.width = window.innerWidth;
const height = canvas.height = window.innerHeight;
let pm = new ParticleManager(width, height);

const weapon = new Weapon(0, height/2, 0, pm);

function render() {
    ctx.clearRect(0, 0, width, height);
    ctx.fillStyle = '#FFD700';
    ctx.fillRect(0, 0, width, height);
    pm.draw(ctx);
    deltaTime.update();
    weapon.update();
    pm.update();
    requestAnimationFrame(render);
}

render();