import React from 'react';
import { makeStyles } from "@material-ui/core/styles";
import { useWeb3React } from "@web3-react/core";
import { useAppSelector } from '../app/hooks';
import { getShortAddress } from "../utils/format";
import { getEthBalance } from '../slices/walletSlice';
  
 const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: theme.spacing(0, 3),
    height: "50px",
    backgroundColor: "#6655f1",
    color: "white",
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
  },
  walletBalance: {
    fontSize: "12px",
  },
  walletSection: {
    textAlign: 'right'
  },
}));

const Bottom = () => {
  const classes = useStyles();
  const ethBalance = useAppSelector(getEthBalance);
  const { account } = useWeb3React();

  return (
      <div className={classes.root}>
        <div>
            <span>DeFi App</span>
        </div>
        {
          account &&
          <div className={classes.walletSection}>
            <div>
              { getShortAddress(account) }
            </div>
            <div  className={classes.walletBalance}>
              {ethBalance} ETH
            </div>
        </div>
        }
      </div>
  )
}

export default Bottom;
