import React, { Component, Fragment } from 'react';
import Button from '@material-ui/core/Button/Button';
import Grid from '@material-ui/core/Grid/Grid';
import TextField from '@material-ui/core/TextField/TextField';
import request from '../../api/request';
import { getSquadron, postSquadron } from '../../api';
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
});

class ManageSquadrons extends Component {
    state = {
        name: '',
        squadrons: [],
    };
    handleChange = name => event => {
        const value = event.target.value;
        this.setState({[name]: value});
    };
    handleSubmit = () => {
        request(postSquadron, false, {'name': this.state.name}).then(data => {
            if(data.hasOwnProperty('name')) {
                this.setState(prevState => ({
                    squadrons: [...prevState.squadrons, data],
                    name: '',
                }));
            }
        });
    };

    componentDidMount() {
        request(getSquadron).then(data => {
            const {history} = this.props;
            handleUnauthorised(data, history);
            this.setState({squadrons: data});
        });
    }

    render() {
        const {classes} = this.props;
        return (
            <Fragment>
                <Typography variant="display1">
                    Manage Squadron
                </Typography>
                <form noValidate autoComplete="off" className={classes.form}>
                    <Grid container spacing={16}>
                        <Grid item xs={12}>
                            <TextField
                                required
                                id="name"
                                label="Squad Name"
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
                    {this.state.squadrons.map(
                        squadron => <Grid item xs={4} key={squadron.id}>
                            <Paper>
                                <Typography variant={'headline'}>
                                    {squadron.name}
                                </Typography>
                                <Typography
                                    variant={'body1'} className={classes.text}
                                >Scrap {squadron.scrap}</Typography>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    component={Link}
                                    to={{
                                        pathname: '/manage-drones',
                                        state: {squadron},
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

ManageSquadrons = withStyles(styles)(withRouter(ManageSquadrons));

export default ManageSquadrons;
