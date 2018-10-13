import { createMuiTheme } from '@material-ui/core/styles';

const spacing = 16;

const theme = createMuiTheme({
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
