import { canvasHeight, canvasWidth } from './constants';

export function isOffCanvas(particle) {
    return (
        particle.position.x > (canvasWidth + particle.radius) ||
        particle.position.x < (0 - particle.radius) ||
        particle.position.y > (canvasHeight + particle.radius) ||
        particle.position.y < (0 - particle.radius)
    );
}

export function returnToCanvas(drone) {
    if(drone.position.x > canvasWidth) {
        drone.position.x = 0;
    }
    if(drone.position.x < 0) {
        drone.position.x = canvasWidth;
    }
    if(drone.position.y > canvasHeight) {
        drone.position.y = 0;
    }
    if(drone.position.y < 0) {
        drone.position.y = canvasHeight;
    }
}

export function distanceTo(p1, p2) {
    const dx = p2.position.x - p1.position.x,
        dy = p2.position.y - p1.position.y;
    return Math.sqrt(dx * dx + dy * dy);
}

export function didCollide(p1, p2) {
    return !(p1.id === p2.id) && distanceTo(p1, p2) < p1.radius + p2.radius;
}