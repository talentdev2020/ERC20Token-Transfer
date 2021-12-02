import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../app/store';
interface IWalletState {
    daiBalance: string;
    ethBalance: string;
}

const initialState: IWalletState = {
  daiBalance: "0",
  ethBalance: "0"
};

export const walletSlice = createSlice({
  name: 'wallet',
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    // Use the PayloadAction type to declare the contents of `action.payload`
    setDaiBalance: (state, action: PayloadAction<string>) => {
      state.daiBalance = action.payload;
    },
    setEthBalance: (state, action: PayloadAction<string>) => {
      state.ethBalance = action.payload;
    },
  },
});

export const { setDaiBalance } = walletSlice.actions;
export const { setEthBalance } = walletSlice.actions;

export const getDaiBalance = (state: RootState) => state.wallet.daiBalance;
export const getEthBalance = (state: RootState) => state.wallet.ethBalance;

export default walletSlice.reducer;
