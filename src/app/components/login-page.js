import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField/TextField';
import Button from '@material-ui/core/Button/Button';
import request from '../../api/request';
import { postLogin } from '../../api';
import Grid from '@material-ui/core/Grid/Grid';

class Login extends Component {

    state = {
        username: '',
        password: '',
    };

    handleChange = name => event => {
        this.setState({
            [name]: event.target.value,
        });
    };

    handleSubmit = () => {
        request(postLogin, false, this.state).then(data => {
            if(data.hasOwnProperty('user')) {
                window.localStorage.setItem('user', data.user);
            }
        });
    };

    render() {
        return (
            <form noValidate autoComplete="off">
                <Grid item xs={12}>
                    <TextField id="username" label="Username"
                               value={this.state.name}
                               onChange={this.handleChange('username')}
                               margin="normal"/>
                </Grid>
                <Grid item xs={12}>
                    <TextField id="password" label="Password" type="password"
                               value={this.state.name}
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

export default Login;
