import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../app/store';

interface IWalletInfo {
    daiBalance: String;
    ethBalance: String;
    address: String;
}

interface IWalletState {
  wallet: IWalletInfo;
  tokenInstance: null;
}

const initialState: IWalletState = {
  wallet: {
    daiBalance: "0",
    ethBalance: "0",
    address: ""
  },
  tokenInstance: null
};

export const walletSlice = createSlice({
  name: 'wallet',
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    // Use the PayloadAction type to declare the contents of `action.payload`
    setWalletInfo: (state, action: PayloadAction<IWalletInfo>) => {
      state.wallet = action.payload;
    },
    
  },
});

export const { setWalletInfo } = walletSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
export const getWalletInfo = (state: RootState) => state.wallet.wallet;

export const getTokenInstance = (state: RootState) => state.wallet.tokenInstance;

export default walletSlice.reducer;
