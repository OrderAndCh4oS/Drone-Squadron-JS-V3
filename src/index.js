import React, { Fragment } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './app/app';
import CssBaseline from '@material-ui/core/CssBaseline';
import theme from './theme';
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';

// Todo: Redux the state...
ReactDOM.render(
    <Fragment>
        <CssBaseline/>
        <Router>
            <MuiThemeProvider theme={theme}>
                <App/>
            </MuiThemeProvider>
        </Router>
    </Fragment>,
    document.getElementById('root'),
);
