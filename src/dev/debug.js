export default class Debug {
    constructor() {
        this._scannerRadiusToggle = false;
        this._scannerPathToggle = false;
        this._droneNameToggle = false;
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
        this.addScannerRadiusToggleListener();
        this.addScannerPathToggleListener();
        this.addNameToggleListener();
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
}
