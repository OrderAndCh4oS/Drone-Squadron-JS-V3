import React, { Component } from 'react';
import { Redirect, withRouter } from 'react-router';
import Grid from '@material-ui/core/Grid/Grid';
import TextField from '@material-ui/core/TextField/TextField';
import Button from '@material-ui/core/Button/Button';
import auth from '../auth';
import request from '../../api/request';
import { postLogin } from '../../api';

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
        console.log(this.state.user);
        request(postLogin, false, this.state.user).then(data => {
            if(data.hasOwnProperty('user')) {
                window.localStorage.setItem('user', data.user);
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
            <form noValidate autoComplete="off">
                <Grid item xs={12}>
                    <TextField id="username" label="Username"
                               value={this.state.user.username}
                               onChange={this.handleChange('username')}
                               margin="normal"/>
                </Grid>
                <Grid item xs={12}>
                    <TextField id="password" label="Password" type="password"
                               value={this.state.user.password}
                               onChange={this.handleChange('password')}
                               autoComplete="current-password" margin="normal"/>
                </Grid>
                <Grid item xs={12}>
                    <Button variant="contained" color="primary"
                            onClick={this.handleSubmit}>
                        Login
                    </Button>
                </Grid>
            </form>
        );
    }
}

Login = withRouter(Login);

export default Login;
