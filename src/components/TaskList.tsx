import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { add } from "../store/todoSlice";
import { fetchTasklist } from "../store/tasklistSlice";
import { STATUSES } from "../store/tasklistSlice";
import { Task, TaskList as TaskListType } from "../store/types";
import { RootStateType } from "../store/store";

const TaskList = () => {
  const dispatch = useDispatch();
  const { tasklist, status } = useSelector(
    (state: RootStateType) => state.tasklist
  ) as TaskListType;

  const todo = useSelector((state: RootStateType) => state.todo) as Task[];

  useEffect(() => {
    dispatch(fetchTasklist());
  }, [dispatch]);

  const handleAdd = (task: Task) => {
    const val = todo?.find((i: Task) => i.id === task.id);
    if (val) {
      console.log("This task is already added in list");
    }

    !val && dispatch(add(task));
  };

  if (status === STATUSES.LOADING) {
    return (
      <div>
        <h2>Loading....</h2>
      </div>
    );
  }

  if (status === STATUSES.ERROR) {
    return <h2>Something went wrong!</h2>;
  }
  return (
    <div className="wrapper">
      {tasklist.map((task) => (
        <div key={task.id}>
          <div className="card" key={task.id}>
            <h4>{task.title}</h4>

            <button onClick={() => handleAdd(task)} className="btn">
              Add
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TaskList;
