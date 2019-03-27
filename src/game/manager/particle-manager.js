import { didCollide, isOffCanvas } from '../functions';
import { dm } from '../constants/constants';

export default class ParticleManager {
    constructor() {
        this._particles = [];
    }

    addParticle(particle) {
        this._particles.push(particle);
    }

    update() {
        this._particles = this._particles
            .map(p => {
                p.draw();
                p.update();
                this.collisionDetection(p);
                if(isOffCanvas(p)) {
                    p.removeParticle();
                }
                return p;
            })
            .filter(p => !p.remove && !isOffCanvas(p));
    }

    reset() {
        this._particles = [];
    }

    collisionDetection(p) {
        dm.drones.map((d) => {
            if(didCollide(p, d)) {
                const initialHealth = d.health.currentHealth;
                d.health.takeDamage(p.damage);
                if(p.id !== -1) {
                    if(initialHealth > 0 && d.health.currentHealth <= 0) {
                        p.tallyKill(d);
                    }
                    p.tallyDamage(p.damage);
                    p.removeParticle();
                }
            }
        });
    }
}
