
export default class ParticleManager {
    constructor(windowWidth, windowHeight) {
        this.windowWidth = windowWidth;
        this.windowHeight = windowHeight;
        this.particles = [];
        this.keepParticle = this.keepParticle.bind(this);
    }

    addParticle(particle) {
        this.particles.push(particle)
    }

    update() {
        this.particles = this.particles
            .map(p => {
                p.update();
                return p;
            })
            .filter(this.keepParticle);
    }

    draw(ctx) {
        this.particles.map(p => p.draw(ctx))
    }

    keepParticle(particle) {
        return !(
            particle.position.x > (this.windowWidth + particle.radius)  ||
            particle.position.x < (0 - particle.radius) ||
            particle.position.y > (this.windowHeight + particle.radius)  ||
            particle.position.y < (0 - particle.radius)
        )
    }
}