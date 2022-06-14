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

export type Login_Data = {
  Email: string;
  Password: string;
};
