import React from 'react';
import { MuiThemeProvider, createTheme } from '@material-ui/core/styles'; // v1.x
import { MuiThemeProvider as V0MuiThemeProvider} from 'material-ui';
import logo from './logo.svg';
import { Wallet } from './features/wallet/Wallet';
import './App.css';

const theme = createTheme({
  /* theme for v1.x */
 });

function App() {
  return (
    <MuiThemeProvider theme={theme}>
        {/*Components*/}
    </MuiThemeProvider>
  );
}

export default App;
