import React, { Component } from 'react';
import Routes from './routes';
import { ThemeProvider } from '@material-ui/styles';
import { createMuiTheme } from '@material-ui/core/styles';
import { deepOrange } from '@material-ui/core/colors';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#000"
    },
    secondary: {
      main: deepOrange[900]
    },
  },
  typography: {
    fontFamily: [
      '"Lato"',
      'sans-serif'
    ].join(',')
  },
});


class App extends Component {
  render() {
    return (
      <div>
        <ThemeProvider theme={theme}>
          <Routes />
        </ThemeProvider>
      </div>
    );
  }
}

export default App;