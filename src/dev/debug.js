export default class Debug {
    constructor() {
        this._gameGridToggle = false;
        this._scannerRadiusToggle = false;
        this._scannerPathToggle = false;
        this._droneNameToggle = false;
        this._droneDataToggle = false;
        this._gameGridLog = false;
    }

    get droneDataToggle() {
        return this._droneDataToggle;
    }

    set droneDataToggle(value) {
        this._droneDataToggle = value;
    }

    get gameGridLog() {
        return this._gameGridLog;
    }

    set gameGridLog(value) {
        this._gameGridLog = value;
    }

    get gameGridToggle() {
        return this._gameGridToggle;
    }

    set gameGridToggle(value) {
        this._gameGridToggle = value;
    }

    get droneNameToggle() {
        return this._droneNameToggle;
    }

    set droneNameToggle(value) {
        this._droneNameToggle = value;
    }

    get scannerPathToggle() {
        return this._scannerPathToggle;
    }

    set scannerPathToggle(value) {
        this._scannerPathToggle = value;
    }

    get scannerRadiusToggle() {
        return this._scannerRadiusToggle;
    }

    set scannerRadiusToggle(value) {
        this._scannerRadiusToggle = value;
    }

    initialiseListeners() {
        this.addGameGridToggleListener();
        this.addScannerRadiusToggleListener();
        this.addScannerPathToggleListener();
        this.addNameToggleListener();
        this.addDataToggleListener();
        this.addGameGridLogListener();
    }

    addGameGridLogListener() {
        document.getElementById('game-grid-log')
            .addEventListener('click', (e) => {
                this._gameGridLog = !this._gameGridLog;
            });
    }

    addGameGridToggleListener() {
        document.getElementById('game-grid-toggle')
            .addEventListener('click', (e) => {
                e.target.classList.toggle('toggled');
                this._gameGridToggle = !this._gameGridToggle;
            });
    }

    addScannerRadiusToggleListener() {
        document.getElementById('scanner-radius-toggle')
            .addEventListener('click', (e) => {
                e.target.classList.toggle('toggled');
                this._scannerRadiusToggle = !this._scannerRadiusToggle;
            });
    }

    addScannerPathToggleListener() {
        document.getElementById('scanner-path-toggle')
            .addEventListener('click', (e) => {
                e.target.classList.toggle('toggled');
                this._scannerPathToggle = !this._scannerPathToggle;
            });
    }

    addNameToggleListener() {
        document.getElementById('name-toggle')
            .addEventListener('click', (e) => {
                e.target.classList.toggle('toggled');
                this._droneNameToggle = !this._droneNameToggle;
            });
    }

    addDataToggleListener() {
        document.getElementById('data-toggle')
            .addEventListener('click', (e) => {
                e.target.classList.toggle('toggled');
                this._droneDataToggle = !this._droneDataToggle;
            });
    }
}
