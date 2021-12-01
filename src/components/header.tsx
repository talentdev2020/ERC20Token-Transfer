import React from 'react';
import { makeStyles } from "@material-ui/core/styles";
import { useAppSelector, useAppDispatch } from '../app/hooks';
import {
    setProvider,
    getProvider
} from '../slices/walletSlice';
  
 const useStyles = makeStyles(theme => ({
  root: {
    margin: "auto"
  }, 
}));

const Header = () => {
  const classes = useStyles();
  const provider = useAppSelector(getProvider);
  const dispatch = useAppDispatch();

  return (
      <div >

      </div>
  )
}

export default Header;
