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
        const {username} = this.props;
        return (
            <Fragment>
                <Typography variant="h4">
                    Drone Squadron
                </Typography>
                {
                    username !== ''
                        ?
                        <Typography variant="subtitle1">{username}</Typography>
                        : null
                }
            </Fragment>
        );
    }
}

const mapStateToProps = (state) => {
    return state.userReducer;
};

export default withStyles(styles)(connect(mapStateToProps)(Home));
