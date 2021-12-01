import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../app/store';

interface IWalletInfo {
    balance: Number;
    address: String;
    provider: any;
}

const initialState: IWalletInfo = {
  balance: 0,
  address: "",
  provider: null
};

export const walletSlice = createSlice({
  name: 'wallet',
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    // Use the PayloadAction type to declare the contents of `action.payload`
    setWalletInfo: (state, action: PayloadAction<IWalletInfo>) => {
      state.balance = action.payload.balance;
      state.address = action.payload.address;
    },
    setProvider: (state, action: PayloadAction<any>) => {
        state.provider = action.payload;
      },
  },
});

export const { setWalletInfo } = walletSlice.actions;
export const { setProvider } = walletSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
export const getWalletInfo = (state: RootState) => ({
    balance: state.wallet.balance,
    address: state.wallet.address
});

export const getProvider = (state: RootState) => state.wallet.provider;

export default walletSlice.reducer;
