import React, { Component, Fragment } from 'react';
import { Redirect, withRouter } from 'react-router';
import Grid from '@material-ui/core/Grid/Grid';
import TextField from '@material-ui/core/TextField/TextField';
import Button from '@material-ui/core/Button/Button';
import auth from '../auth';
import request from '../../api/request';
import { postLogin } from '../../api';
import Typography from '@material-ui/core/Typography/Typography';
import { connect } from 'react-redux';
import { setUser } from '../../store/user/actions';

class Login extends Component {
    state = {
        redirectToReferrer: false,
        user: {
            username: '',
            password: '',
        },
    };

    handleChange = name => event => {
        const value = event.target.value;
        this.setState(prevState => {
            return {
                user: {
                    ...prevState.user,
                    [name]: value,
                },
            };
        });
    };

    handleSubmit = () => {
        request(postLogin, false, this.state.user).then(data => {
            if(data.hasOwnProperty('user')) {
                window.localStorage.setItem('user', JSON.stringify(data.user));
                this.props.updateName(data.user);
                auth.authenticate(() => {
                    this.setState({redirectToReferrer: true});
                });
            }
        });
    };

    render() {
        const {from} = this.props.location.state || {from: {pathname: '/'}};
        if(this.state.redirectToReferrer) {
            return <Redirect to={from}/>;
        }
        return (
            <Fragment>
                <Typography variant="h4">
                    Mission Start
                </Typography>
                <form noValidate autoComplete="off">
                    <Grid container spacing={16}>
                        <Grid item xs={12}>
                            <TextField
                                required
                                id="username"
                                label="Username"
                                value={this.state.user.username}
                                onChange={this.handleChange('username')}
                                margin="normal"
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                required
                                id="password"
                                label="Password"
                                type="password"
                                value={this.state.user.password}
                                onChange={this.handleChange('password')}
                                autoComplete="current-password"
                                margin="normal"
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Button
                                variant="contained"
                                color="primary"
                                onClick={this.handleSubmit}
                            >
                                Login
                            </Button>
                        </Grid>
                    </Grid>
                </form>
            </Fragment>
        );
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        updateName: name => dispatch(setUser(name)),
    };
};

Login = withRouter(connect(null, mapDispatchToProps)(Login));

export default Login;
