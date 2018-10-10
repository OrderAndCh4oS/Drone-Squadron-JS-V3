export default class Debug {
    constructor() {
        this._gameGrid = false;
        this._scannerRadius = false;
        this._scannerPath = false;
        this._droneName = false;
        this._droneData = false;
        this._gameData = false;
        this._gameGridLog = false;
    }

    get gameData() {
        return this._gameData;
    }

    set gameData(value) {
        this._gameData = value;
    }

    get droneData() {
        return this._droneData;
    }

    set droneData(value) {
        this._droneData = value;
    }

    get gameGrid() {
        return this._gameGrid;
    }

    set gameGrid(value) {
        this._gameGrid = value;
    }

    get gameGridLog() {
        return this._gameGridLog;
    }

    set gameGridLog(value) {
        this._gameGridLog = value;
    }

    get droneName() {
        return this._droneName;
    }

    set droneName(value) {
        this._droneName = value;
    }

    get scannerPath() {
        return this._scannerPath;
    }

    set scannerPath(value) {
        this._scannerPath = value;
    }

    get scannerRadius() {
        return this._scannerRadius;
    }

    set scannerRadius(value) {
        this._scannerRadius = value;
    }

    gameDataToggle() {
        this._gameData = !this._gameData;
    }

    droneDataToggle() {
        this._droneData = !this._droneData;
    }

    gameGridLogToggle() {
        this._gameGridLog = !this._gameGridLog;
    }

    gameGridToggle() {
        this._gameGrid = !this._gameGrid;
    }

    droneNameToggle() {
        this._droneName = !this._droneName;
    }

    scannerPathToggle() {
        this._scannerPath = !this._scannerPath;
    }

    scannerRadiusToggle() {
        this._scannerRadius = !this._scannerRadius;
    }
}

