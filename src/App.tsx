import React from 'react';
import { MuiThemeProvider, createTheme } from '@material-ui/core/styles'; // v1.x
import { makeStyles } from "@material-ui/core/styles";
import Wallet from './pages/wallet';
import Header from "./components/header"
import Bottom from "./components/bottom"


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
        <Header />
        <Wallet />
        <Bottom />
    </MuiThemeProvider>
  );
}

export default App;
