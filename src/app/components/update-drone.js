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

class UpdateDrone extends Component {
    state = {
        squadron: this.props.location.state.squadron,
        drone: this.props.location.state.drone,
        updates: {},
        updated: false,
        priceList: {
            weapon: [],
            gimbal: [],
            thruster: [],
            steering: [],
            scanner: [],
        },
    };

    handleUpdate = (name, item) => event => {
        const value = event.target.value;
        const item_id = this.findItemId(
            this.state.priceList[name],
            value,
        );
        this.setState(prevState => ({
            drone: {
                ...prevState.drone,
                [item]: value,
            },
            updates: {
                ...prevState.updates,
                [name]: item_id,
            },
        }));
    };
    handleSubmit = () => {
        const updates = {
            squadron: this.state.squadron.id,
            ...this.state.updates,
        };
        request(putDrone, {id: this.state.drone.id}, updates).then(data => {
            this.setState({
                updates: {},
                updated: true,
            });
            setTimeout(() => this.setState({updated: false}), 2000);
        });
    };

    componentDidMount() {
        if(!this.props.location.state.squadron) {
            this.props.history.push('/manage-squadrons');
        }
        if(!this.props.location.state.drone) {
            this.props.history.push('/manage-squadrons');
        }

        function makePriceList(data) {
            return data.reduce((obj, listItem) => {
                obj[listItem.item] = obj[listItem.item] || [];
                const item = listItem['item'];
                delete listItem['item'];
                obj[item].push(listItem);
                return obj;
            }, {});
        }

        request(getPriceList).then(data => {
            const {history} = this.props;
            handleUnauthorised(data, history);
            this.setState({priceList: makePriceList(data)});
        });
    }

    render() {
        const {classes} = this.props;
        return (
            <Fragment>
                <Typography variant="display1">
                    Manage Drones
                </Typography>
                <Grid container justify="flex-start" spacing={16}>
                    <Grid item xs={12}>
                        <Paper>
                            <Grid item xs={12}>
                                <Typography
                                    variant={'headline'}
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
                                        onChange={this.handleUpdate('weapon',
                                            'weapon_name')}
                                        input={<Input name="age" id="weapon"/>}
                                    >
                                        {
                                            this.state.priceList.weapon.map(
                                                weapon =>
                                                    <MenuItem
                                                        key={weapon.item_id}
                                                        value={weapon.name}
                                                    >{weapon.name + ', Cost: ' +
                                                    weapon.scrap}</MenuItem>)
                                        }
                                    </Select>
                                </FormControl>
                                <FormControl className={classes.formControl}>
                                    <InputLabel
                                        shrink htmlFor="gimbal"
                                    >Gimbal</InputLabel>
                                    <Select
                                        value={this.state.drone.gimbal_name}
                                        onChange={this.handleUpdate('gimbal',
                                            'gimbal_name')}
                                        input={<Input name="age" id="gimbal"/>}
                                    >
                                        {
                                            this.state.priceList.gimbal.map(
                                                gimbal =>
                                                    <MenuItem
                                                        key={gimbal.item_id}
                                                        value={gimbal.name}
                                                    >{gimbal.name + ', Cost: ' +
                                                    gimbal.scrap}</MenuItem>)
                                        }
                                    </Select>
                                </FormControl>
                                <FormControl className={classes.formControl}>
                                    <InputLabel
                                        shrink htmlFor="thruster"
                                    >Thruster</InputLabel>
                                    <Select
                                        value={this.state.drone.thruster_name}
                                        onChange={this.handleUpdate('thruster',
                                            'thruster_name')}
                                        input={<Input
                                            name="age" id="thruster"
                                        />}
                                    >
                                        {
                                            this.state.priceList.thruster.map(
                                                thruster =>
                                                    <MenuItem
                                                        key={thruster.item_id}
                                                        value={thruster.name}
                                                    >{thruster.name +
                                                    ', Cost: ' +
                                                    thruster.scrap}</MenuItem>)
                                        }
                                    </Select>
                                </FormControl>
                                <FormControl className={classes.formControl}>
                                    <InputLabel
                                        shrink htmlFor="steering"
                                    >Steering</InputLabel>
                                    <Select
                                        value={this.state.drone.steering_name}
                                        onChange={this.handleUpdate('steering',
                                            'steering_name')}
                                        input={<Input
                                            name="age" id="steering"
                                        />}
                                    >
                                        {
                                            this.state.priceList.steering.map(
                                                steering =>
                                                    <MenuItem
                                                        key={steering.item_id}
                                                        value={steering.name}
                                                    >{steering.name +
                                                    ', Cost: ' +
                                                    steering.scrap}</MenuItem>)
                                        }
                                    </Select>
                                </FormControl>
                                <FormControl className={classes.formControl}>
                                    <InputLabel
                                        shrink htmlFor="scanner"
                                    >Scanner</InputLabel>
                                    <Select
                                        value={this.state.drone.scanner_name}
                                        onChange={this.handleUpdate('scanner',
                                            'scanner_name')}
                                        input={<Input
                                            name="scanner" id="scanner"
                                        />}
                                    >
                                        {
                                            this.state.priceList.scanner.map(
                                                scanner =>
                                                    <MenuItem
                                                        key={scanner.item_id}
                                                        value={scanner.name}
                                                    >{scanner.name +
                                                    ', Cost: ' +
                                                    scanner.scrap}</MenuItem>)
                                        }
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid item xs={12}>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    onClick={this.handleSubmit}
                                >Complete Updates</Button>
                                {this.state.updated ? <Typography
                                    variant={'body1'}
                                    className={classes.updated}
                                >Updated</Typography> : null}
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

    findItemId(itemList, name) {
        console.log('find: ', name);
        const match = itemList.filter(
            item => item.name === name,
        );
        if(match.length) {
            return match[0].item_id;
        }
        return '';
    }
}

UpdateDrone = withStyles(styles)(withRouter(UpdateDrone));

export default UpdateDrone;
