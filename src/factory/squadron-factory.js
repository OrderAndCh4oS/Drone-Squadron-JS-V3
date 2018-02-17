import Squadron from '../squadron';
import DroneFactory from './drone-factory';

export default class SquadronFactory {
    static make(squadronData) {
        const squadron = new Squadron(
            squadronData.id,
            squadronData.name,
            squadronData.colour,
        );
        squadronData.drones.map((d) => {
            squadron.addDrone(DroneFactory.make(d, squadronData));
        });
        return squadron;
    }
}