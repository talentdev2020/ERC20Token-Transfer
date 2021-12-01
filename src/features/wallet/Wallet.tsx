import React, { useState } from 'react';

import { useAppSelector, useAppDispatch } from '../../app/hooks';
import {
  setWalletInfo,
  getWalletInfo
} from '../../slices/walletSlice';

export function Wallet() {
  const walletInfo = useAppSelector(getWalletInfo);
  const dispatch = useAppDispatch();
 
  return (
    <div>
       Wallet
    </div>
  );
}
