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
    back: {
        marginTop: theme.spacing.unit,
    },
    error: {
        marginTop: theme.spacing.unit,
        color: '#ff0000x',
    },
});

class ManageDrones extends Component {
    state = {
        name: '',
        squadron: this.props.location.state.squadron,
        drones: [],
        errors: {
            name: false,
        },
    };
    handleChange = name => event => {
        const value = event.target.value;
        this.setState({
            [name]: value,
            errors: {
                [name]: false,
            },
        });
    };
    handleSubmit = () => {
        const values = {
            'name': this.state.name,
            'squadron': this.state.squadron.id,
        };
        request(postDrone, false, values).then(data => {
            if(data.hasOwnProperty('error')) {
                this.setState({errors: data.error});
                setTimeout(() => {
                    this.setState({errors: {}});
                }, 5000);
            }
            if(data.hasOwnProperty('name')) {
                // ToDo: return squadron scrap from API and update squadron
                this.setState(prevState => ({
                    drones: [...prevState.drones, data],
                    squadron: {
                        ...prevState.squadron,
                        scrap: prevState.squadron.scrap - 50,
                    },
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

    com;

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
                <Typography variant="body1">
                    Scrap: {this.state.squadron.scrap}
                </Typography>
                <form noValidate autoComplete="off" className={classes.form}>
                    <Grid container spacing={16}>
                        <Grid item xs={12}>
                            <TextField
                                required
                                error={this.state.errors.name}
                                id="name"
                                label="Drone Name"
                                value={this.state.name}
                                helperText={this.state.errors.name
                                    ? this.state.errors.name
                                    : false}
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
                            {this.state.errors.message ? <Typography
                                className={classes.error}
                            >{this.state.errors.message}</Typography> : null}
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
                                    color="primary"
                                    component={Link}
                                    to={{
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
                <Button
                    className={classes.back}
                    onClick={() => this.props.history.goBack()}
                >Back</Button>
            </Fragment>
        );
    }
}

ManageDrones = withStyles(styles)(withRouter(ManageDrones));

export default ManageDrones;
