import React, { useState } from 'react';
import { makeStyles } from "@material-ui/core/styles";
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import { ethers, utils } from 'ethers';
import { useAppDispatch } from '../app/hooks';
import { fixedBalance } from "../utils/format"
import {
    setWalletInfo,
    setTokenInstance,
    setProvider
} from '../slices/walletSlice';

import ABI from "../consts/tokenABI.json"  ;
declare global {
    interface Window { ethereum: any; }
}
 const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: theme.spacing(0, 3),
    height: "50px",
    backgroundColor: "#6655f1",
    color: "white"
  }, 
}));

const Header = () => {
  const classes = useStyles();
  const dispatch = useAppDispatch();
  const [isConnect, setIsConnect] = useState( false );

  const onConnectWallet = async () => {
    if (window.ethereum) {
        setIsConnect(true);
        try {
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
            const address = accounts[0];
            const contractAddress = process.env.REACT_APP_CONTRACTADDRESS || "0xad6d458402f60fd3bd25163575031acdce07538d" 
            const tokenInstance = new ethers.Contract(contractAddress, ABI, provider);
            const daiBalance = await tokenInstance.balanceOf(address);
            const ethBalance = await provider.getBalance(address);

            dispatch(setWalletInfo({
                ethBalance: fixedBalance(utils.formatEther(ethBalance)),
                daiBalance: fixedBalance(utils.formatEther(daiBalance)),
                address
            }))
            dispatch(setTokenInstance(tokenInstance))
            dispatch(setProvider(provider))
        } catch (err) {
            console.log(err)
        }
        setIsConnect(false);
    }
  }
  return (
      <div className={classes.root}>
        <div>
            <span>DeFi App</span>
        </div>
        <div>
            <Button variant="contained" color="secondary" onClick={ () => onConnectWallet()} >
                CONNECT WALLET  
                {
                    isConnect && <CircularProgress size="1.5rem"/>
                }
            </Button>
        </div>
      </div>
  )
}

export default Header;
