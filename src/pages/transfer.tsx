import React, { useState } from 'react';
import { isAddress } from "@ethersproject/address";
import { useWeb3React } from "@web3-react/core";
import { Contract } from "@ethersproject/contracts";
import { parseEther } from "@ethersproject/units";
import { makeStyles } from "@material-ui/core/styles";
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import { useAppSelector } from '../app/hooks';
import { getDaiBalance } from '../slices/walletSlice';
import { DaiContractAddress } from "../consts/contractAddress";
import ABI from "../consts/tokenABI.json"  ;

const useStyles = makeStyles(theme => ({
  root: {
    margin: "auto",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: 'column',
    height: "calc(100vh - 100px)"
  },
  inputAddress: {
    margin: "15px 0",
    width: "400px"
  },
  inputAmount: {
    width: "400px",
    marginBottom: "5px"
  },
  button: {
    width: "200px"
  },
  balance: {
    color: "#6655f1",
    paddingLeft: "20px"
  }
}));

const Transfer = () => {
  const classes = useStyles();
  const { account, library } = useWeb3React();
  const [amount, setAmount] = useState<number>(0);
  const [address, setAddress] = useState<string>("");
  const [isSending, setIsSending] = useState<boolean>(false);
  const [isAddressError, setAddressError] = useState<boolean>(false);
  const [isAmountError, setAmountError] = useState<boolean>(false);
  const [transactionHash, setTransactionHash] = useState<string>("");
  const daiBalance = useAppSelector(getDaiBalance);

  const onChangeAmount = (e: any) => {
    setAmount(e.target.value);
    setAmountError(false);
  }
  
  const onChangeAddress = (e: any) => {
    setAddress(e.target.value);
    setAddressError(false);
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

    setIsSending(true);
    const tokenInstance = new Contract(DaiContractAddress, ABI, library.getSigner());
    
    try {
      let tx = await tokenInstance.transfer(address, parseEther(amount.toString()));
      setTransactionHash(tx.hash);

      await tx.wait();
    } catch (err: any) {
      console.log(err)
    }
    
    setIsSending(false);   
  }

  const onRedirectTransaction = () => {
    window.open(`https://ropsten.etherscan.io/tx/${transactionHash}`)
  }

  return (
    <div className={classes.root}>
      <div>
        <TextField
          id="input-amount"
          className={classes.inputAmount}
          error={isAmountError}
          variant="outlined"
          label="Enter the amount"
          type="number"
          onChange={e => onChangeAmount(e)}
        />
        {
          account && 
          <div className={classes.balance}>
            DAI Balance: {daiBalance}
          </div>
        }
      </div>

      <div>
        <TextField
          id="input-address"
          className={classes.inputAddress}
          variant="outlined"
          error={isAddressError}
          label="Enter the recipient address"
          onChange={e => onChangeAddress(e)}
        />
      </div>

      <Button disabled={!account} variant="contained" color="primary" className={classes.button} onClick={ () => onSend()} >
        SEND
        {
          isSending && <CircularProgress size="1.5rem" color="secondary"/>
        }
      </Button>
      <br/>
      <Button disabled={!transactionHash} variant="contained" color="primary" className={classes.button} onClick={ () => onRedirectTransaction()} >
        Viw Transaction
      </Button>
    </div>
  )
}

export default Transfer;
