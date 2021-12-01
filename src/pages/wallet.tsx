import React, { useState } from 'react';
import { isAddress } from "@ethersproject/address";
import { ethers, utils } from 'ethers';
import { makeStyles } from "@material-ui/core/styles";
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import { useAppSelector } from '../app/hooks';

import {
    getTokenInstance,
    getWalletInfo,
    getProvdier
} from '../slices/walletSlice';

const useStyles = makeStyles(theme => ({
  root: {
    margin: "auto",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: 'column',
    height: "calc(100vh - 100px)"
  },
  input: {
    margin: "15px 0",
    width: "400px"
  },
  button: {
    width: "200px"
  }
}));

const Wallet = () => {
  const classes = useStyles();
  const [amount, setAmount] = useState(0);
  const [address, setAddress] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [isAddressError, setAddressError] = useState(false);
  const [isAmountError, setAmountError] = useState(false);
  
  const provider = useAppSelector(getProvdier);
  const walletInfo = useAppSelector(getWalletInfo);

  const onChangeAmount = (e: any) => {
    setAmount(e.target.value);
    setAmountError(false);
  }
  
  const onChangeAddress = (e: any) => {
    setAddress(e.target.value);
    setAddressError(false);
  }

  const makeTransaction = (from: string, ABI: Array<string>) => {
    const contractAddress = process.env.REACT_APP_CONTRACTADDRESS || "0xad6d458402f60fd3bd25163575031acdce07538d";
    
    let iface = new utils.Interface(ABI)
    const tx = [{
        from: walletInfo.address,
        to: contractAddress,
        data: iface.encodeFunctionData("transfer", [ address, utils.parseEther(amount.toString()) ])
      }];

    return tx;
  }
  const onSend = async () => { 
    if (!amount) {
        setAmountError(true);
        return;
    }

    if (!address || !isAddress(address)) {
        setAddressError(true);
        return;
    }

    if (!provider) {
        alert("You should connect wallet")
        return;
    }

    const tx = makeTransaction(address, ["function transfer(address to, uint amount)"]);
    (provider as any).send('eth_sendTransaction', tx);
  }

  return (
      <div className={classes.root}>
            <div>
                <TextField
                    id="input-amount"
                    className={classes.input}
                    error={isAmountError}
                    variant="outlined"
                    label="Enter the amount"
                    type="number"
                    onChange={e => onChangeAmount(e)}
                />
            </div>
            <div>
                <TextField
                    id="input-address"
                    className={classes.input}
                    variant="outlined"
                    error={isAddressError}
                    label="Enter the recipient address"
                    onChange={e => onChangeAddress(e)}
                />
            </div>
            <Button variant="contained" color="primary" className={classes.button} onClick={ () => onSend()} >
                SEND
                {
                    isSending && <CircularProgress size="1.5rem"/>
                }
            </Button>
      </div>
  )
}

export default Wallet;
