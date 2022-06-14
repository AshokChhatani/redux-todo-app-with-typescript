import { Login, Login_Data } from "./types";
const { createSlice, createAsyncThunk, Action } = require("@reduxjs/toolkit");
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
    try {
      const response = await fetch("https://reqres.in/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });
      let data = await response.json();

      if (response.status === 200) {
        localStorage.setItem("token", data.token);
        return data;
      } else {
        return;
      }
    } catch (e: any) {
      console.log("Error", e.response.data);
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
  },
  extraReducers: {
    [login.pending]: (state: Login, action: ActionType) => {
      state.status = STATUSES.LOADING;
    },
    [login.fulfilled]: (state: Login, action: ActionType) => {
      state.login = true;
      state.status = STATUSES.IDLE;
    },
    [login.rejected]: (state: Login, action: ActionType) => {
      state.status = STATUSES.ERROR;
    },
  },
});

export const { logout } = loginSlice.actions;
export default loginSlice.reducer;
