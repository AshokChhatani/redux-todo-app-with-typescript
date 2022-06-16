import axios from "axios";
import { Login, Login_Data, Response } from "./types";
const {
  createSlice,
  createAsyncThunk,
  Action,
  rejectWithValue,
} = require("@reduxjs/toolkit");
type ActionType = typeof Action;

export const STATUSES = {
  IDLE: "idle",
  ERROR: "error",
  LOADING: "loading",
};

const initialState: Login = {
  login: false,
  status: STATUSES.IDLE,
};

export const login = createAsyncThunk(
  "users/login",
  async (user: Login_Data) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const body = JSON.stringify(user);
    try {
      const res: Response = await axios.post(
        "https://reqres.in/api/login",
        body,
        config
      );
      let data = res;
      localStorage.setItem("token", data.data.token);
      return data;
    } catch (err: any) {
      const error = err.response.data.error;
      return rejectWithValue(error);
    }
  }
);

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
