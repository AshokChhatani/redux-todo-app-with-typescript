import { ActionType, TaskList, Task } from "./types";
const { createSlice } = require("@reduxjs/toolkit");

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
    getlistFetch: (state: TaskList) => {
      state.status = STATUSES.LOADING;
    },
    getlistSuccess: (state: TaskList, action: ActionType) => {
      state.tasklist = action.payload;
      state.status = STATUSES.IDLE;
    },
    getlistFailure: (state: TaskList) => {
      state.status = STATUSES.ERROR;
    },
    removeTaskFromTaskList: (state: TaskList, action: ActionType) => {
      const newState = state.tasklist.filter(
        (item: Task) => item.id !== action.payload
      );
      state.tasklist = newState;

      // state.filter((i: Task) => i.id !== action.payload.id);
    },
  },
});

export const {
  getlistFetch,
  getlistSuccess,
  getlistFailure,
  removeTaskFromTaskList,
} = tasklistSlice.actions;
export default tasklistSlice.reducer;
