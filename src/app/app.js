import React, { Component } from 'react';
import { Link, Route } from 'react-router-dom';
import AppBar from '@material-ui/core/AppBar/AppBar';
import Toolbar from '@material-ui/core/Toolbar/Toolbar';
import IconButton from '@material-ui/core/IconButton/IconButton';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List/List';
import Divider from '@material-ui/core/Divider/Divider';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper/Paper';
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

const styles = theme => ({
    root: {
        flexGrow: 1,
    },
    grow: {
        flexGrow: 1,
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
        {...rest} render={props =>
        auth.isAuthenticated ? (
            <Component {...props} />
        ) : (
            <Redirect to={{
                pathname: '/login',
                state: {from: props.location},
            }}/>
        )
    }/>
);

const AuthButton = withRouter(({history}) => {
    return !auth.isAuthenticated ?
        <Button color="inherit" component={Link} to={'/login'}>
            Login
        </Button> :
        <Button color="inherit" onClick={() => auth.signOut(
            () => history.push('/'))}>
            Logout
        </Button>;
});

const AuthListButton = withRouter(({history}) => {
    return !auth.isAuthenticated ?
        <ListItem button component={Link} to={'/login'}>
            <ListItemText primary="Login"/>
        </ListItem> :
        <ListItem button onClick={() => auth.signOut(
            () => history.push('/'))}>
            <ListItemText primary="Logout"/>
        </ListItem>;
});

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
            <List>
                <ListItem button component={Link} to={'/mission-start'}>
                    <ListItemText primary="Mission Start"/>
                </ListItem>
            </List>
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

    render() {
        const {classes} = this.props;
        return (
            <div className={classes.root}>
                <Grid container spacing={24}>
                    <AppBar position="static">
                        <Toolbar>
                            <IconButton className={classes.menuButton}
                                        color="inherit" aria-label="Menu">
                                <MenuIcon
                                    onClick={this.toggleDrawer('left', true)}/>
                            </IconButton>
                            <Typography variant="subheading" color="inherit"
                                        className={classes.grow}>
                                Drone Squadron
                            </Typography>
                            <AuthButton/>
                        </Toolbar>
                    </AppBar>
                    <Drawer open={this.state.left}
                            onClose={this.toggleDrawer('left', false)}>
                        <div tabIndex={0} role="button"
                             onClick={this.toggleDrawer('left', false)}
                             onKeyDown={this.toggleDrawer('left', false)}>
                            {this.sideList}
                        </div>
                    </Drawer>
                    <Grid item xs={12}>
                        <Paper>
                            <Route exact path="/" component={Home}/>
                            <PrivateRoute exact path="/mission-start"
                                          component={MissionStart}/>
                            <Route path="/login" component={Login}/>
                        </Paper>
                    </Grid>
                </Grid>
            </div>
        );
    }
}

App = withRouter(withStyles(styles)(App));

export default App;
