import React, { Component } from 'react';
import Main from '../game/game';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';
import request from '../api/request';
import { getPriceList } from '../api';
import Login from './components/login-page';

const styles = theme => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        padding: theme.spacing.unit * 2,
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
    button: {
        marginBottom: theme.spacing.unit,
    },
});

class App extends Component {
    handleClick = () => {
        this.setState(prevState => ({
            play: true,
        }));
    };

    constructor(props) {
        super(props);
        this.state = {
            play: false,
        };
    }

    componentDidMount() {
        request(getPriceList).then(data => console.log(data));
    }

    render() {
        const {classes} = this.props;
        return (
            <div className={classes.root}>
                <Grid container spacing={24}>
                    <Grid item xs={12}>
                        <Typography component="h2" variant="display1"
                                    gutterBottom>
                            Drone Squadron
                        </Typography>
                        <Login/>
                        <Button variant='contained' color='primary'
                                className={classes.button}
                                onClick={this.handleClick}>Play</Button>
                        {this.state.play ? <Main/> : null}
                    </Grid>
                </Grid>
            </div>
        );
    }
}

App = withStyles(styles)(App);

export default App;
