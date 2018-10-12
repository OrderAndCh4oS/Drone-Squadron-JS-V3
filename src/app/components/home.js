import React, { Component } from 'react';
import Typography from '@material-ui/core/Typography/Typography';
import { withStyles } from '@material-ui/core';

const styles = theme => ({
    grow: {
        flexGrow: 1,
    },
});

class Home extends Component {
    render() {
        const {classes} = this.props;
        return (
            <div>
                <Typography variant="display1" className={classes.grow}>
                    Drone Squadron
                </Typography>
            </div>
        );
    }
}

Home = withStyles(styles)(Home);

export default Home;
