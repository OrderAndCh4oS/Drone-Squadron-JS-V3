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