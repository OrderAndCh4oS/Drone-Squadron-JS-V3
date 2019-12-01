import React, { Component, Fragment } from 'react';
import Typography from '@material-ui/core/Typography/Typography';
import withStyles from '@material-ui/core/styles/withStyles';
import request from '../../api/request';
import { getSquadron } from '../../api';
import { handleUnauthorised } from '../auth';
import FormControl from '@material-ui/core/FormControl/FormControl';
import InputLabel from '@material-ui/core/InputLabel/InputLabel';
import Select from '@material-ui/core/Select/Select';
import Grid from '@material-ui/core/Grid/Grid';
import Paper from '@material-ui/core/Paper/Paper';
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button/Button';
import MenuItem from '@material-ui/core/MenuItem/MenuItem';
import Input from '@material-ui/core/Input/Input';

const styles = theme => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    formControl: {
        marginRight: theme.spacing.unit,
        marginBottom: theme.spacing.unit,
        minWidth: 120,
    },
    selectEmpty: {
        marginTop: theme.spacing.unit * 2,
    },
    form: {
        marginBottom: theme.spacing.unit * 2,
    },
    button: {
        marginBottom: theme.spacing.unit,
    },
});

class SelectSquadron extends Component {
    state = {
        squadrons: [],
        squadronOne: {},
        squadronTwo: {},
    };

    handleUpdate = event => {
        const value = event.target.value;
        const name = event.target.name;
        this.setState({
            [name]: this.findById(value),
        });
    };

    findById = (value) => {
        return this.state.squadrons.find(squadron => squadron.id === value) ||
            '';
    };

    squadronOneList = () => {
        return this.state.squadrons.filter(squadron => {
            if(
                !this.state.squadronTwo.hasOwnProperty('id') ||
                squadron.id !== this.state.squadronTwo.id
            ) {
                return squadron;
            }
        });
    };

    squadronTwoList = () => {
        return this.state.squadrons.filter(squadron => {
            if(
                !this.state.squadronOne.hasOwnProperty('id') ||
                squadron.id !== this.state.squadronOne.id
            ) {
                return squadron;
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
                <Typography variant="h4">
                    Select Squadrons
                </Typography>
                <Paper>
                    <Grid item xs={12}>
                        <FormControl className={classes.formControl}>
                            <InputLabel shrink htmlFor="squadronOne">
                                Squadron One
                            </InputLabel>
                            <Select
                                value={this.state.squadronOne.id || ''}
                                onChange={this.handleUpdate}
                                input={<Input
                                    name="squadronOne" id="squadronOne"
                                />}
                            >
                                {this.squadronOneList().map(squadron =>
                                    <MenuItem
                                        key={squadron.id} value={squadron.id}
                                    >
                                        {squadron.name}
                                    </MenuItem>)}
                            </Select>
                        </FormControl>
                        <FormControl className={classes.formControl}>
                            <InputLabel shrink htmlFor="squadronTwo">
                                Squadron Two
                            </InputLabel>
                            <Select
                                value={this.state.squadronTwo.id || ''}
                                onChange={this.handleUpdate}
                                input={<Input
                                    name="squadronTwo" id="squadronTwo"
                                />}
                            >
                                {this.squadronTwoList().map(squadron =>
                                    <MenuItem
                                        key={squadron.id} value={squadron.id}
                                    >
                                        {squadron.name}
                                    </MenuItem>)}
                            </Select>
                        </FormControl>
                    </Grid>
                    <Button
                        variant="contained"
                        color="primary"
                        component={Link}
                        to={{
                            pathname: '/mission-start',
                            state: {
                                squadronOne: this.state.squadronOne,
                                squadronTwo: this.state.squadronTwo,
                            },
                        }}
                    >Start</Button>
                </Paper>
            </Fragment>

        );
    }
}

export default withStyles(styles)(SelectSquadron);
