import React from 'react';
import { MuiThemeProvider, createTheme } from '@material-ui/core/styles'; // v1.x
import { Wallet } from './features/wallet/Wallet';
import { makeStyles } from "@material-ui/core/styles";

import './App.css';

const theme = createTheme({
  /* theme for v1.x */
 });
 const useStyles = makeStyles(theme => ({
  root: {
    margin: "auto"
  }, 
}));

function App() {
  const classes = useStyles();
  return (
    <MuiThemeProvider theme={theme}>
        <Wallet />
    </MuiThemeProvider>
  );
}

export default App;
