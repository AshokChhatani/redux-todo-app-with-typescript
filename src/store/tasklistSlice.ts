import { TaskList } from "./types";
const { createSlice, createAsyncThunk, Action } = require("@reduxjs/toolkit");
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

export const fetchTasklist = createAsyncThunk("tasklist/fetch", async () => {
  const res = await fetch("https://jsonplaceholder.typicode.com/todos");
  const data = await res.json();
  return data;
});

const tasklistSlice = createSlice({
  name: "tasklist",
  initialState,
  reducers: {},
  extraReducers: {
    [fetchTasklist.pending]: (state: TaskList, action: ActionType) => {
      state.status = STATUSES.LOADING;
    },
    [fetchTasklist.fulfilled]: (state: TaskList, action: ActionType) => {
      state.tasklist = action.payload;
      state.status = STATUSES.IDLE;
    },
    [fetchTasklist.rejected]: (state: TaskList, action: ActionType) => {
      state.status = STATUSES.ERROR;
    },
  },
});

export const { setTasklist, setStatus } = tasklistSlice.actions;
export default tasklistSlice.reducer;
