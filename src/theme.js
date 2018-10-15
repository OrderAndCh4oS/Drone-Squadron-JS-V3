import { createMuiTheme } from '@material-ui/core/styles';

const spacing = 16;

const theme = createMuiTheme({
    palette: {
        primary: {
            light: '#4f5b62',
            main: '#263238',
            dark: '#000a12',
            contrastText: '#fff',
        },
        secondary: {
            light: '#9cff57',
            main: '#64dd17',
            dark: '#1faa00',
            contrastText: '#000a12',
        },
    },

    typography: {
        useNextVariants: true,
        fontFamily: [
            'Roboto',
            '"Helvetica Neue"',
            'Tahoma',
            'Arial',
            'sans-serif',
            '"Apple Color Emoji"',
            '"Segoe UI Emoji"',
            '"Segoe UI Symbol"',
        ].join(','),
        fontWeightMedium: 500,
        button: {
            fontStyle: 'italic',
        },
        display1: {
            color: 'black',
            marginBottom: spacing,
        },
    },
    overrides: {
        MuiPaper: {
            root: {
                padding: '16px',
            },
        },
    },
});

export default theme;
