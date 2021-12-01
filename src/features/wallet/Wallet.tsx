import { useState } from 'react';

import { useAppSelector, useAppDispatch } from '../../app/hooks';
import {
  setBalance,
  getBalance
} from './walletSlice';

export function Counter() {
  const balance = useAppSelector(getBalance);
  const dispatch = useAppDispatch();
 
  return (
    <div>
       
    </div>
  );
}
