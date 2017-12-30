import ParticleManager from './particle-manager';
import {deltaTime} from './delta-time';
import Bullet from './bullet';

const canvas = document.getElementById('canvas');
let ctx = canvas.getContext('2d');
const width = canvas.width = window.innerWidth;
const height = canvas.height = window.innerHeight;
let pm = new ParticleManager(width, height);

setInterval(() => {
    const bullet = new Bullet(0, height / 2, 0, 0);
    pm.addParticle(bullet);
    const bullet1 = new Bullet(0, height / 2, 0, 2);
    pm.addParticle(bullet1);
    const bullet2 = new Bullet(0, height / 2, 0, 4);
    pm.addParticle(bullet2);
}, 2000);

function render() {
    ctx.clearRect(0, 0, width, height);
    ctx.fillStyle = '#FFD700';
    ctx.fillRect(0, 0, width, height);
    pm.draw(ctx);
    deltaTime.update();
    pm.update();
    requestAnimationFrame(render);
}

render();