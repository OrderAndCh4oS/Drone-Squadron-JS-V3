import canvas from '../service/canvas';
import { squadrons } from '../constants/constants';
import DisplayData from './display-data';

export default class GameOver extends DisplayData {

    constructor() {
        super(canvas.width / 2, canvas.height / 2 - 40, 'green', 'center', 32);
    }

    draw() {
        this.addLine('Game Over');
        if(squadrons[0].health > squadrons[1].health) {
            this.addLine(squadrons[0].name + ' Wins');
        } else if(squadrons[1].health > squadrons[0].health) {
            this.addLine(squadrons[1].name + ' Wins');
        } else {
            this.addLine('Draw');
        }
        super.draw();
    }
}
