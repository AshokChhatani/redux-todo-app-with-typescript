import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { RootStateType } from "../store/store";
import { remove } from "../store/todoSlice";
import { Login, Task } from "../store/types";

const TodoList = () => {
  const dispatch = useDispatch();

  const todo = useSelector((state: RootStateType) => state.todo) as Task[];

  const handleRemove = (taskId: Number) => {
    dispatch(remove(taskId));
  };

  const isLogin = useSelector((state: RootStateType) => state.login) as Login;
  const navigate = useNavigate();
  useEffect(() => {
    if (!isLogin) {
      navigate("/login");
    }
  }, [isLogin, navigate]);

  return (
    <div>
      <h3>To Do List</h3>
      <div className="cartWrapper">
        {todo.map((task) => (
          <div key={task.id} className="todoListCard">
            <h5>{task.title}</h5>
            <h5>{task.completed}</h5>
            <button className="btn" onClick={() => handleRemove(task.id)}>
              Remove
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TodoList;
