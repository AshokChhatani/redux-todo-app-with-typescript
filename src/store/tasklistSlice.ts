import { TaskList } from "./types";
const { createSlice, Action } = require("@reduxjs/toolkit");
type ActionType = typeof Action;

export const STATUSES = {
  IDLE: "idle",
  ERROR: "error",
  LOADING: "loading",
};

const initialState: TaskList = {
  tasklist: [],
  status: STATUSES.IDLE,
};

const tasklistSlice = createSlice({
  name: "tasklist",
  initialState,
  reducers: {
    getlistFetch: (state: any) => {
      state.status = STATUSES.LOADING;
    },
    getlistSuccess: (state: any, action: ActionType) => {
      state.tasklist = action.payload;
      state.status = STATUSES.IDLE;
    },
    getlistFailure: (state: any) => {
      state.status = STATUSES.ERROR;
    },
  },
});

export const { getlistFetch, getlistSuccess, getlistFailure } =
  tasklistSlice.actions;
export default tasklistSlice.reducer;
