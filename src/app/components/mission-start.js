import React, { Component, Fragment } from 'react';
import Button from '@material-ui/core/Button/Button';
import Main from '../../game/game';
import { withStyles } from '@material-ui/core';
import Typography from '@material-ui/core/Typography/Typography';
import request from '../../api/request';
import { getDroneBySquadron } from '../../api';
import { handleUnauthorised } from '../auth';

const styles = theme => ({
    button: {
        marginBottom: theme.spacing.unit,
    },
});

class MissionStart extends Component {
    state = {
        play: false,
        squadronOne: {
            ...this.props.location.state.squadronOne,
            colour: 'blue',
        },
        squadronTwo: {
            ...this.props.location.state.squadronTwo,
            colour: 'red',
        },
    };

    handleClick = () => {
        this.setState({play: true});
    };

    componentDidMount() {
        request(getDroneBySquadron, {id: this.state.squadronOne.id})
            .then(data => {
                const {history} = this.props;
                handleUnauthorised(data, history);
                this.setState(prevState => ({
                    squadronOne: {
                        ...prevState.squadronOne,
                        drones: data,
                    },
                }));
            });
        request(getDroneBySquadron, {id: this.state.squadronTwo.id})
            .then(data => {
                const {history} = this.props;
                handleUnauthorised(data, history);
                console.log(data);
                this.setState(prevState => ({
                    squadronTwo: {
                        ...prevState.squadronTwo,
                        drones: data,
                    },
                }));
            });
    }

    render() {
        const {classes} = this.props;
        return (
            <Fragment>
                <Typography variant="display1" className={classes.grow}>
                    Mission Start
                </Typography>
                <Button
                    variant='contained'
                    color='primary'
                    className={classes.button}
                    onClick={this.handleClick}
                >Play</Button>
                {this.state.play ?
                    <Main
                        squadrons={[
                            this.state.squadronOne,
                            this.state.squadronTwo]}
                    /> : null}
            </Fragment>
        );
    }
}

MissionStart = withStyles(styles)(MissionStart);

export default MissionStart;
