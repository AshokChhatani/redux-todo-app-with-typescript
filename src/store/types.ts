const { Action } = require("@reduxjs/toolkit");

export type TaskList = {
  tasklist: Task[];
  status: string;
};

export type Task = {
  id: number;
  userId: number;
  title: string;
  completed: boolean;
};

export type Login = {
  login: Boolean;
  status: string;
};

export type LoginData = {
  Email: string;
  Password: string;
};

export type ActionType = typeof Action;
