import React, { Component, Fragment } from 'react';
import Button from '@material-ui/core/Button/Button';
import Grid from '@material-ui/core/Grid/Grid';
import request from '../../api/request';
import { getPriceList, putDrone } from '../../api';
import Paper from '@material-ui/core/Paper/Paper';
import Typography from '@material-ui/core/Typography/Typography';
import withStyles from '@material-ui/core/styles/withStyles';
import { withRouter } from 'react-router';
import { handleUnauthorised } from '../auth';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel/InputLabel';
import Input from '@material-ui/core/Input/Input';
import MenuItem from '@material-ui/core/MenuItem/MenuItem';
import FormControl from '@material-ui/core/FormControl/FormControl';
import { updateDrone } from '../../store/drones/actions';
import { updateSquadron } from '../../store/squadrons/actions';
import { connect } from 'react-redux';

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
    back: {
        marginTop: theme.spacing.unit,
    },
    text: {
        marginBottom: theme.spacing.unit,
    },
    updated: {
        paddingTop: theme.spacing.unit,
        color: theme.palette.secondary.main,
        marginBottom: theme.spacing.unit,
    },
});

const UpdateMessage = ({classes, updated}) => updated ?
    <Typography variant={'body1'} className={classes.updated}>
        Updated
    </Typography>
    : null;

const ErrorMessage = ({classes, error}) => error ?
    <Typography className={classes.error}>
        {error}
    </Typography>
    : null;

class UpdateDrone extends Component {
    state = {
        drone: this.props.location.state.drone,
        errors: {},
        updates: {},
        updated: false,
        priceList: {
            weapon: [],
            gimbal: [],
            thruster: [],
            steering: [],
            scanner: [],
        },
        cost_of_updates: 0,
    };

    handleUpdate = event => {
        const item_name = event.target.value;
        const type = event.target.name;
        const item = this.findItemByName(
            this.state.priceList[type],
            item_name,
        );
        this.setState(prevState => ({
            drone: {
                ...prevState.drone,
                [type + '_name']: item_name,
            },
            updates: {
                ...prevState.updates,
                [type]: item,
            },
            cost_of_updates: this.updateCost(type, item),
        }));
    };

    handleSubmit = () => {
        if(this.state.cost_of_updates > this.props.squadron.scrap) {
            this.setState({errors: {message: 'Not enough scrap'}});
            setTimeout(() => {
                this.setState({errors: {}});
            }, 5000);
            return;
        }
        const updates = {
            squadron: this.props.squadron.id,
            ...this.prepare_updates(),
        };
        request(putDrone, {id: this.state.drone.id}, updates).then(data => {
            this.props.updateDrone(data);
            this.props.updateSquadron({
                ...this.props.squadron,
                scrap: this.props.squadron.scrap - this.state.cost_of_updates,
            });
            this.setState({
                updates: {},
                updated: true,
                cost_of_updates: 0,
            });
            setTimeout(() => this.setState({updated: false}), 2000);
        });
    };

    findItemByName = (itemList, name) => {
        return itemList.find(item => item.name === name) || '';
    };

    prepare_updates = () => {
        const updates = {};
        for(let key in this.state.updates) {
            if(this.state.updates.hasOwnProperty(key)) {
                updates[key] = this.state.updates[key].item_id;
            }
        }
        return updates;
    };

    updateCost = (type, item) => {
        const updates = this.state.updates;
        updates[type] = item;
        return Object.values(updates)
            .reduce((cost, item) => cost + item.scrap, 0);
    };

    makePriceList = (data) => {
        return data.reduce((obj, listItem) => {
            obj[listItem.item] = obj[listItem.item] || [];
            const item = listItem['item'];
            delete listItem['item'];
            obj[item].push(listItem);
            return obj;
        }, {});
    };

    componentDidMount() {
        if(!this.props.location.state.squadron) {
            this.props.history.push('/manage-squadrons');
        }
        if(!this.props.location.state.drone) {
            this.props.history.push('/manage-squadrons');
        }
        request(getPriceList).then(data => {
            const {history} = this.props;
            handleUnauthorised(data, history);
            this.setState({priceList: this.makePriceList(data)});
        });
    }

    render() {
        const {classes, squadron} = this.props;
        return (
            <Fragment>
                <Typography variant="h4">
                    Manage Drones
                </Typography>
                <Typography variant="subtitle1">
                    {squadron.name}
                </Typography>
                <Typography variant="body1">
                    Scrap: {squadron.scrap}
                </Typography>
                <Typography variant="body1" className={classes.text}>
                    Cost of Updates: {this.state.cost_of_updates}
                </Typography>
                <Grid container justify="flex-start" spacing={16}>
                    <Grid item xs={12}>
                        <Paper>
                            <Grid item xs={12}>
                                <Typography
                                    variant={'h4'}
                                    className={classes.text}
                                >
                                    {this.state.drone.name}
                                </Typography>
                                <Typography
                                    variant={'body1'} className={classes.text}
                                >Missions {this.state.drone.missions}</Typography>
                                <Typography
                                    variant={'body1'} className={classes.text}
                                >Kills {this.state.drone.kills}</Typography>
                                <Typography
                                    variant={'body1'} className={classes.text}
                                >Value {this.state.drone.value}</Typography>
                            </Grid>
                            <Grid item xs={12}>
                                <FormControl className={classes.formControl}>
                                    <InputLabel
                                        shrink htmlFor="weapon"
                                    >Weapon</InputLabel>
                                    <Select
                                        value={this.state.drone.weapon_name}
                                        onChange={this.handleUpdate}
                                        input={<Input
                                            name="weapon" id="weapon"
                                        />}
                                    >
                                        {this.weapon_options()}
                                    </Select>
                                </FormControl>
                                <FormControl className={classes.formControl}>
                                    <InputLabel
                                        shrink htmlFor="gimbal"
                                    >Gimbal</InputLabel>
                                    <Select
                                        value={this.state.drone.gimbal_name}
                                        onChange={this.handleUpdate}
                                        input={<Input
                                            name="gimbal" id="gimbal"
                                        />}
                                    >
                                        {this.gimbal_options()}
                                    </Select>
                                </FormControl>
                                <FormControl className={classes.formControl}>
                                    <InputLabel
                                        shrink htmlFor="thruster"
                                    >Thruster</InputLabel>
                                    <Select
                                        value={this.state.drone.thruster_name}
                                        onChange={this.handleUpdate}
                                        input={<Input
                                            name="thruster" id="thruster"
                                        />}
                                    >
                                        {this.thruster_options()}
                                    </Select>
                                </FormControl>
                                <FormControl className={classes.formControl}>
                                    <InputLabel
                                        shrink htmlFor="steering"
                                    >Steering</InputLabel>
                                    <Select
                                        value={this.state.drone.steering_name}
                                        onChange={this.handleUpdate}
                                        input={<Input
                                            name="steering" id="steering"
                                        />}
                                    >
                                        {this.steering_options()}
                                    </Select>
                                </FormControl>
                                <FormControl className={classes.formControl}>
                                    <InputLabel
                                        shrink htmlFor="scanner"
                                    >Scanner</InputLabel>
                                    <Select
                                        value={this.state.drone.scanner_name}
                                        onChange={this.handleUpdate}
                                        input={<Input
                                            name="scanner" id="scanner"
                                        />}
                                    >
                                        {this.scanner_options()}
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid item xs={12}>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    onClick={this.handleSubmit}
                                >Complete Updates</Button>
                                <UpdateMessage
                                    classes={classes}
                                    updated={this.state.updated}
                                />
                                <ErrorMessage
                                    classes={classes}
                                    error={this.state.errors.message}
                                />
                            </Grid>
                        </Paper>
                        <Button
                            className={classes.back}
                            onClick={() => this.props.history.goBack()}
                        >Back</Button>
                    </Grid>
                </Grid>
            </Fragment>
        );
    }

    scanner_options() {
        return this.state.priceList.scanner.map(
            scanner =>
                <MenuItem key={scanner.item_id} value={scanner.name}>
                    {scanner.name + ', Cost: ' + scanner.scrap}
                </MenuItem>,
        );
    }

    steering_options() {
        return this.state.priceList.steering.map(
            steering =>
                <MenuItem key={steering.item_id} value={steering.name}>
                    {steering.name + ', Cost: ' + steering.scrap}
                </MenuItem>,
        );
    }

    thruster_options() {
        return this.state.priceList.thruster.map(
            thruster =>
                <MenuItem
                    key={thruster.item_id} value={thruster.name}
                >{thruster.name +
                ', Cost: ' +
                thruster.scrap}</MenuItem>);
    }

    gimbal_options() {
        return this.state.priceList.gimbal.map(
            gimbal =>
                <MenuItem key={gimbal.item_id} value={gimbal.name}>
                    {gimbal.name + ', Cost: ' + gimbal.scrap}
                </MenuItem>,
        );
    }

    weapon_options() {
        return this.state.priceList.weapon.map(
            weapon =>
                <MenuItem
                    key={weapon.item_id}
                    value={weapon.name}
                    scrap={weapon.scrap}
                >
                    {weapon.name + ', Cost: ' + weapon.scrap}
                </MenuItem>,
        );
    }
}

const mapStateToProps = (state, props) => {
    const squadron = props.location.state.squadron;
    const drone = props.location.state.drone;
    return {
        drone: state.drones.find(d => d.id === drone.id),
        squadron: state.squadrons.find(s => s.id === squadron.id),
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        updateDrone: drone => dispatch(updateDrone(drone)),
        updateSquadron: squadron => dispatch(updateSquadron(squadron)),
    };
};

export default withStyles(styles)(withRouter(
    connect(mapStateToProps, mapDispatchToProps)(UpdateDrone),
));
