import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AuthState {
  isLoggedIn: boolean;
  userToken: string | null;
  loading: boolean;
}

const initialState: AuthState = {
  isLoggedIn: false,
  userToken: null,
  loading: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginState(state) {
      state.loading = true;
    },
    loginSuccess(state, action: PayloadAction<string>) {
      state.isLoggedIn = true;
      state.userToken = action.payload;
      state.loading = false;
    },
    loginFailure(state) {
      state.isLoggedIn = false;
      state.userToken = null;
      state.loading = false;
    },
    logutFailure(state) {
      state.isLoggedIn = false;
      state.userToken = null;
      state.loading = false;
    },
     logout(state) {
      state.isLoggedIn = false;
      state.userToken = null;
      state.loading = false;
    },
  },
});

export const { loginSuccess,loginState,loginFailure, logutFailure,logout } = authSlice.actions;
export default authSlice.reducer;
