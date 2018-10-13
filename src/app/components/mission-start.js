import React, { Component, Fragment } from 'react';
import Button from '@material-ui/core/Button/Button';
import Main from '../../game/game';
import { withStyles } from '@material-ui/core';
import Typography from '@material-ui/core/Typography/Typography';

const styles = theme => ({
    button: {
        marginBottom: theme.spacing.unit,
    },
});

class MissionStart extends Component {
    state = {
        play: false,
    };

    handleClick = () => {
        this.setState({play: true});
    };

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
                {this.state.play ? <Main/> : null}
            </Fragment>
        );
    }
}

MissionStart = withStyles(styles)(MissionStart);

export default MissionStart;
