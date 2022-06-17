import { Login, ActionType } from "./types";
const { createSlice } = require("@reduxjs/toolkit");

export const STATUSES = {
  IDLE: "idle",
  ERROR: "error",
  LOADING: "loading",
};

const initialState: Login = {
  login: false,
  status: STATUSES.IDLE,
};

const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    logout(state: Login, action: ActionType) {
      localStorage.removeItem("token");
      state.login = false;
    },
    loginStart: (state: any) => {
      state.status = STATUSES.LOADING;
    },
    loginSuccess: (state: any, action: ActionType) => {
      state.login = true;
      state.status = STATUSES.IDLE;
    },
    loginFailure: (state: any) => {
      state.status = STATUSES.ERROR;
    },
  },
});

export const { logout, loginStart, loginSuccess, loginFailure } =
  loginSlice.actions;
export default loginSlice.reducer;
