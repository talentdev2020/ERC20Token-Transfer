import React from 'react';
import { Web3ReactProvider } from "@web3-react/core";
import { Web3Provider } from '@ethersproject/providers'
import { MuiThemeProvider, createTheme } from '@material-ui/core/styles'; // v1.x
import Transfer from './pages/transfer';
import Header from "./components/header"
import Bottom from "./components/bottom"


import './App.css';

const theme = createTheme({
  /* theme for v1.x */
 });

 function getLibrary(provider: any): Web3Provider {
  const library = new Web3Provider(provider)
  library.pollingInterval = 12000
  return library
}

function App() {
  return (
    <MuiThemeProvider theme={theme}>
      <Web3ReactProvider getLibrary={getLibrary}>
        <Header />
        <Transfer />
        <Bottom />
      </Web3ReactProvider>
    </MuiThemeProvider>
  );
}

export default App;
