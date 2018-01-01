import { isOffCanvas } from './functions';

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
                return p;
            })
            .filter(p => !isOffCanvas(p));
    }
}