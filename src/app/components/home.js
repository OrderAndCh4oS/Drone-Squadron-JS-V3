import React, { Component, Fragment } from 'react';
import Typography from '@material-ui/core/Typography/Typography';
import { withStyles } from '@material-ui/core';
import { connect } from 'react-redux';

const styles = theme => ({
    grow: {
        flexGrow: 1,
    },
});

class Home extends Component {
    render() {
        const {user, squadrons, drones} = this.props;
        return (
            <Fragment>
                <Typography variant="h4">
                    Drone Squadron
                </Typography>
                {
                    user.username !== ''
                        ?
                        <Typography variant="subtitle1">{user.username}</Typography>
                        : null
                }
            </Fragment>
        );
    }
}

const mapStateToProps = (state) => {
    return state;
};

export default withStyles(styles)(connect(mapStateToProps)(Home));
