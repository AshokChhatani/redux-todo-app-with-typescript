import { Task, ActionType } from "./types";

const { createSlice } = require("@reduxjs/toolkit");

const initialState: Task[] = [];

const todoSlice = createSlice({
  name: "todolist",
  initialState,
  reducers: {
    add(state: Task[], action: ActionType) {
      return state.concat(action.payload);
    },
    remove(state: Task[], action: ActionType) {
      return state.filter((item: Task) => item.id !== action.payload.id);
    },
  },
});

export const { add, remove } = todoSlice.actions;
export default todoSlice.reducer;
