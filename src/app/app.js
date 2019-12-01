import React, { Component, Fragment } from 'react';
import { Link, Route } from 'react-router-dom';
import AppBar from '@material-ui/core/AppBar/AppBar';
import Toolbar from '@material-ui/core/Toolbar/Toolbar';
import IconButton from '@material-ui/core/IconButton/IconButton';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List/List';
import Divider from '@material-ui/core/Divider/Divider';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import Login from './components/login-page';
import MissionStart from './components/mission-start';
import Home from './components/home';
import MenuIcon from '@material-ui/icons/Menu';
import ListItem from '@material-ui/core/ListItem/ListItem';
import ListItemText from '@material-ui/core/ListItemText/ListItemText';
import auth from './auth';
import Redirect from 'react-router/es/Redirect';
import { withRouter } from 'react-router';
import ManageSquadrons from './components/manage-squadrons';
import ManageDrones from './components/manage-drones';
import UpdateDrone from './components/update-drone';
import SelectSquadron from './components/select-squadron';
import { setSquadrons } from '../store/squadrons/actions';
import { connect } from 'react-redux';
import { getDrone, getSquadron } from '../api';
import request from '../api/request';
import { setDrones } from '../store/drones/actions';

const styles = theme => ({
    root: {
        flexGrow: 1,
    },
    grow: {
        flexGrow: 1,
    },
    layout: {
        width: 'auto',
        paddingTop: theme.spacing.unit * 2,
        marginLeft: theme.spacing.unit * 4,
        marginRight: theme.spacing.unit * 4,
    },
    list: {
        width: 250,
    },
    fullList: {
        width: 'auto',
    },
    menuButton: {
        marginLeft: -12,
        marginRight: 20,
    },
    paper: {
        padding: theme.spacing.unit * 2,
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
});
const PrivateRoute = ({component: Component, ...rest}) => (
    <Route
        {...rest}
        render={props =>
            auth.isAuthenticated ? (
                <Component {...props} />
            ) : (
                <Redirect
                    to={{
                        pathname: '/login',
                        state: {from: props.location},
                    }}
                />
            )
        }
    />
);

const AuthButton = withRouter(({history}) => {
    return !auth.isAuthenticated ?
        <Button color="inherit" component={Link} to={'/login'}>
            Login
        </Button> :
        <Button
            color="inherit"
            onClick={() => auth.signOut(() => history.push('/'))}
        >
            Logout
        </Button>;
});

const AuthListButton = withRouter(({history}) => {
    return !auth.isAuthenticated ?
        <ListItem button component={Link} to={'/login'}>
            <ListItemText primary="Login"/>
        </ListItem> :
        <ListItem
            button
            onClick={() => auth.signOut(() => history.push('/'))}
        >
            <ListItemText primary="Logout"/>
        </ListItem>;
});

const AdminMenu = () =>
    <Fragment>
        <List>
            <ListItem button component={Link} to={'/manage-squadrons'}>
                <ListItemText primary="Manage Squadrons"/>
            </ListItem>
        </List>
        <List>
            <ListItem button component={Link} to={'/play'}>
                <ListItemText primary="Play"/>
            </ListItem>
        </List>
    </Fragment>;

class App extends Component {

    state = {
        left: false,
    };

    sideList = (
        <div className={this.props.classes.list}>
            <List>
                <ListItem button component={Link} to={'/'}>
                    <ListItemText primary="Home"/>
                </ListItem>
            </List>
            <AdminMenu/>
            <Divider/>
            <List>
                <AuthListButton/>
            </List>
        </div>
    );

    toggleDrawer = (side, open) => () => {
        this.setState({
            [side]: open,
        });
    };

    componentDidMount() {
        request(getSquadron).then(data => this.props.setSquadrons(data));
        request(getDrone).then(data => this.props.setDrones(data));
    }

    render() {
        const {classes} = this.props;
        return (
            <div className={classes.root}>
                <AppBar position="static">
                    <Toolbar>
                        <IconButton
                            className={classes.menuButton}
                            color="inherit"
                            aria-label="Menu"
                            onClick={this.toggleDrawer('left', true)}
                        >
                            <MenuIcon/>
                        </IconButton>
                        <Typography
                            variant="subtitle1"
                            color="inherit"
                            className={classes.grow}
                        >
                            Drone Squadron
                        </Typography>
                        <AuthButton/>
                    </Toolbar>
                </AppBar>
                <Drawer
                    open={this.state.left}
                    onClose={this.toggleDrawer('left', false)}
                >
                    <div
                        tabIndex={0}
                        role="button"
                        onClick={this.toggleDrawer('left', false)}
                        onKeyDown={this.toggleDrawer('left', false)}
                    >
                        {this.sideList}
                    </div>
                </Drawer>
                <div className={classes.layout}>
                    <Route exact path="/" component={Home}/>
                    <PrivateRoute
                        exact
                        path="/manage-squadrons"
                        component={ManageSquadrons}
                    />
                    <PrivateRoute
                        exact path="/manage-drones" component={ManageDrones}
                    />
                    <PrivateRoute
                        exact path="/update-drone" component={UpdateDrone}
                    />
                    <PrivateRoute
                        exact path="/play" component={SelectSquadron}
                    />
                    <PrivateRoute
                        exact path="/mission-start" component={MissionStart}
                    />
                    <Route path="/login" component={Login}/>
                </div>
            </div>
        );
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        setSquadrons: squadrons => dispatch(setSquadrons(squadrons)),
        setDrones: drones => dispatch(setDrones(drones)),
    };
};

export default withRouter(withStyles(styles)(
    connect(null, mapDispatchToProps)(App),
));
