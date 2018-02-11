import { didCollide, isOffCanvas } from '../functions';
import { dm } from '../constants';

export default class ParticleManager {
    constructor() {
        this.particles = [];
    }

    addParticle(particle) {
        this.particles.push(particle);
    }

    update() {
        this.particles = this.particles
            .map(p => {
                p.draw();
                p.update();
                this.collisionDetection(p);
                return p;
            })
            .filter(p => !p.remove && !isOffCanvas(p));
    }

    collisionDetection(p) {
        dm.drones.map((d) => {
            if(didCollide(p, d)) {
                d.health.takeDamage(p.damage);
                p.removeParticle();
            }
        });
    }
}