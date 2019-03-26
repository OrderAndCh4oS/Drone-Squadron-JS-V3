import canvas from '../service/canvas';
import DisplayData from './display-data';

export default class GameOver extends DisplayData {

    constructor() {
        super(canvas.width / 2, canvas.height / 2 - 40, 'green', 'center', 32);
    }

    draw(winner) {
        const message = winner ? winner.name + ' Wins' : 'Draw';
        this.addLine('Game Over');
        this.addLine(message);
        super.draw();
    }
}
