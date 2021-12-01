import React from 'react';
import { makeStyles } from "@material-ui/core/styles";
import { useAppSelector, useAppDispatch } from '../app/hooks';
import { getShortAddress } from "../utils/format";
import {
    getWalletInfo,
} from '../slices/walletSlice';
  
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
  walletSpan: {
    marginRight: "7px",
  }
}));

const Bottom = () => {
  const classes = useStyles();
  const walletInfo = useAppSelector(getWalletInfo);

  return (
      <div className={classes.root}>
        <div>
            <span>DeFi App</span>
        </div>
        {
          walletInfo.address &&
          <div className={classes.walletSection}>
            <div>
              { getShortAddress(walletInfo.address) }
            </div>
            <div  className={classes.walletBalance}>
              <span className={classes.walletSpan}>{walletInfo.ethBalance} ETH</span>
              <span>{walletInfo.daiBalance} DAI</span>
            </div>
        </div>
        }
      </div>
  )
}

export default Bottom;
