import React, { Fragment } from 'react';
import ReactDOM from 'react-dom';
import App from './app/app';
import CssBaseline from '@material-ui/core/CssBaseline';
import theme from './theme';
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';

ReactDOM.render(
    <Fragment>
        <CssBaseline/>
        <MuiThemeProvider theme={theme}>
            <App/>
        </MuiThemeProvider>
    </Fragment>,
    document.getElementById('root'),
);
