import Squadron from '../game-object/squadron';
import DroneFactory from './drone-factory';

export default class SquadronFactory {
    static make(squadronData, utilities) {
        const squadron = new Squadron(
            squadronData.id,
            squadronData.name,
            squadronData.colour,
            squadronData.scrap
        );
        squadronData.drones.map((d) => {
            squadron.addDrone(DroneFactory.make(d, squadronData, utilities));
        });
        return squadron;
    }
}
