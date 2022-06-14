import { Task } from "./types";

const { createSlice, Action } = require("@reduxjs/toolkit");

type ActionType = typeof Action;

const initialState: Task[] = [];

const todoSlice = createSlice({
  name: "todolist",
  initialState,
  reducers: {
    add(state: Task[], action: ActionType) {
      const newState = state.concat(action.payload);
      return newState;
    },
    remove(state: Task[], action: ActionType) {
      const newState = state.filter((item: Task) => item.id !== action.payload);
      return newState;
    },
  },
});

export const { add, remove } = todoSlice.actions;
export default todoSlice.reducer;
