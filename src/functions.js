import { canvasHeight, canvasWidth } from './constants';

export function isOffCanvas(particle) {
    return (
        particle.position.x > (canvasWidth + particle.radius) ||
        particle.position.x < (0 - particle.radius) ||
        particle.position.y > (canvasHeight + particle.radius) ||
        particle.position.y < (0 - particle.radius)
    );
}