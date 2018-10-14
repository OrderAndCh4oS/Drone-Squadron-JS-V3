import React, { Component, Fragment } from 'react';
import Button from '@material-ui/core/Button/Button';
import Grid from '@material-ui/core/Grid/Grid';
import TextField from '@material-ui/core/TextField/TextField';
import request from '../../api/request';
import { getDroneBySquadron, postDrone } from '../../api';
import Paper from '@material-ui/core/Paper/Paper';
import Typography from '@material-ui/core/Typography/Typography';
import withStyles from '@material-ui/core/styles/withStyles';
import { withRouter } from 'react-router';
import { handleUnauthorised } from '../auth';
import { Link } from 'react-router-dom';

const styles = theme => ({
    form: {
        marginBottom: theme.spacing.unit * 2,
    },
    button: {
        marginBottom: theme.spacing.unit,
    },
    text: {
        marginBottom: theme.spacing.unit,
    },
});

class ManageDrones extends Component {
    state = {
        name: '',
        squadron: this.props.location.state.squadron,
        drones: [],
    };
    handleChange = name => event => {
        const value = event.target.value;
        this.setState({[name]: value});
    };
    handleSubmit = () => {
        const values = {
            'name': this.state.name,
            'squadron': this.state.squadron.id,
        };
        request(postDrone, false, values).then(data => {
            if(data.hasOwnProperty('name')) {
                this.setState(prevState => ({
                    drones: [...prevState.drones, data],
                    name: '',
                }));
            }
        });
    };

    componentDidMount() {
        if(!this.props.location.state.squadron) {
            this.props.history.push('/manage-squadrons');
        }
        request(getDroneBySquadron, {id: this.state.squadron.id}).then(data => {
            const {history} = this.props;
            handleUnauthorised(data, history);
            this.setState({drones: data});
        });
    }

    render() {
        const {classes} = this.props;
        return (
            <Fragment>
                <Typography variant="display1">
                    Manage Drones
                </Typography>
                <Typography variant="subheading">
                    {this.state.squadron.name}
                </Typography>
                <form noValidate autoComplete="off" className={classes.form}>
                    <Grid container spacing={16}>
                        <Grid item xs={12}>
                            <TextField
                                required
                                id="name"
                                label="Drone Name"
                                value={this.state.name}
                                onChange={this.handleChange('name')}
                                margin="normal"
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Button
                                variant="contained"
                                color="primary"
                                onClick={this.handleSubmit}
                            >
                                Create
                            </Button>
                        </Grid>
                    </Grid>
                </form>
                <Grid container justify="flex-start" spacing={16}>
                    {this.state.drones.map(
                        drone => <Grid item xs={4} key={drone.id}>
                            <Paper>
                                <Typography variant={'headline'}>
                                    {drone.name}
                                </Typography>
                                <Typography
                                    variant={'body1'}
                                >Missions {drone.missions}</Typography>
                                <Typography
                                    variant={'body1'}
                                >Kills {drone.kills}</Typography>
                                <Typography
                                    variant={'body1'}
                                >Weapon {drone.weapon_name}</Typography>
                                <Typography
                                    variant={'body1'}
                                >Gimbal {drone.gimbal_name}</Typography>
                                <Typography
                                    variant={'body1'}
                                >Thruster {drone.thruster_name}</Typography>
                                <Typography
                                    variant={'body1'}
                                >Steering {drone.steering_name}</Typography>
                                <Typography
                                    variant={'body1'}
                                >Scanner {drone.scanner_name}</Typography>
                                <Typography
                                    variant={'body1'} className={classes.text}
                                >Value {drone.value}</Typography>
                                <Button
                                    variant="contained"
                                    color="primary" component={Link} to={{
                                    pathname: '/update-drone',
                                    state: {
                                        squadron: this.state.squadron,
                                        drone,
                                    },
                                }}
                                >Manage</Button>
                            </Paper>
                        </Grid>)}
                </Grid>
            </Fragment>
        );
    }
}

ManageDrones = withStyles(styles)(withRouter(ManageDrones));

export default ManageDrones;
