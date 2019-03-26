import React, { Component } from 'react';
import { debug } from '../constants/constants';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

const styles = theme => ({
    button: {
        margin: theme.spacing.unit,
    },
});

class DebugBar extends Component {

    toggleGameGrid = () => {
        debug.gameGridToggle();
        this.setState({
            gameGrid: debug.gameGrid,
        });
    };
    toggleScannerRadius = () => {
        debug.scannerRadiusToggle();
        this.setState({
            scannerRadius: debug.scannerRadius,
        });
    };
    toggleScannerPath = () => {
        debug.scannerPathToggle();
        this.setState({
            scannerPath: debug.scannerPath,
        });
    };
    toggleDroneName = () => {
        debug.droneNameToggle();
        this.setState({
            droneName: debug.droneName,
        });
    };
    toggleDroneData = () => {
        debug.droneDataToggle();
        this.setState({
            droneData: debug.droneData,
        });
    };

    constructor(props) {
        super(props);
        this.state = {
            gameGrid: debug.gameGrid,
            scannerRadius: debug.scannerRadius,
            scannerPath: debug.scannerPath,
            droneName: debug.droneName,
            droneData: debug.droneData,
        };
    }

    render() {
        const {classes} = this.props;
        return <div className={'debug-bar'}>
            <Button variant="contained"
                    color={this.state.gameGrid ? 'primary' : 'default'}
                    className={classes.button} onClick={this.toggleGameGrid}>
                Grid
            </Button>
            <Button variant="contained"
                    color={this.state.scannerRadius ? 'primary' : 'default'}
                    className={classes.button}
                    onClick={this.toggleScannerRadius}>
                Scanner Radius
            </Button>
            <Button variant="contained"
                    color={this.state.scannerPath ? 'primary' : 'default'}
                    className={classes.button} onClick={this.toggleScannerPath}>
                Scanner Path
            </Button>
            <Button variant="contained"
                    color={this.state.droneName ? 'primary' : 'default'}
                    className={classes.button} onClick={this.toggleDroneName}>
                Names
            </Button>
            <Button variant="contained"
                    color={this.state.droneData ? 'primary' : 'default'}
                    className={classes.button} onClick={this.toggleDroneData}>
                Drone Data
            </Button>
            <span className="separator">|</span>
            <Button variant="outlined" color={'default'}
                    className={classes.button}
                    onClick={() => debug.gameGridLogToggle()}>
                Log Grid
            </Button>
        </div>;
    }
}

DebugBar = withStyles(styles)(DebugBar);

export default DebugBar;
