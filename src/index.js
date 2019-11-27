import React, { Fragment } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './app/app';
import CssBaseline from '@material-ui/core/CssBaseline';
import theme from './theme';
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';
import { Provider } from 'react-redux';
import rootReducer from './store';
import { applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

const middleware = [thunk];

const store = createStore(
    rootReducer,
    composeWithDevTools(applyMiddleware(...middleware)),
);

ReactDOM.render(
    <Fragment>
        <CssBaseline/>
        <Router>
            <MuiThemeProvider theme={theme}>
                <Provider store={store}>
                    <App/>
                </Provider>
            </MuiThemeProvider>
        </Router>
    </Fragment>,
    document.getElementById('root'),
);
