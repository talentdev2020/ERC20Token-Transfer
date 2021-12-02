import React, { useState } from 'react';
import { makeStyles } from "@material-ui/core/styles";
import { useWeb3React } from "@web3-react/core";
import { formatEther } from "@ethersproject/units";
import { injectedConnector } from "../connectors";
import { Contract } from "@ethersproject/contracts";
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import { useAppDispatch } from '../app/hooks';
import { fixedBalance } from "../utils/format"
import {
    setDaiBalance,
    setEthBalance
} from '../slices/walletSlice';
import { DaiContractAddress } from "../consts/contractAddress";

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
  const { account, activate, library } = useWeb3React();

  const onConnectWallet = async () => {
    await activate(injectedConnector);
    
    setIsConnect(true);
    try {
        const tokenInstance = new Contract(DaiContractAddress, ABI, library);
        const daiBalance = await tokenInstance.balanceOf(account);
        const ethBalance = await library.getBalance(account);
        dispatch(setDaiBalance(fixedBalance(formatEther(daiBalance))));
        dispatch(setEthBalance(fixedBalance(formatEther(ethBalance))));
    } catch (err) {
        console.log(err)
    }
    setIsConnect(false);
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
