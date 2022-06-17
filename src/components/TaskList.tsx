import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { add } from "../store/todoSlice";
import { getlistFetch } from "../store/tasklistSlice";
import { STATUSES } from "../store/tasklistSlice";
import { Task, TaskList as TaskListType } from "../store/types";
import { RootStateType } from "../store/store";
import { Box, Paper, TextField } from "@mui/material";
import { ChangeEvent } from "react";
import Pagination from "./Pagination/Pagination";

const TaskList = () => {
  const dispatch = useDispatch();

  const { tasklist, status } = useSelector(
    (state: RootStateType) => state.tasklist
  ) as TaskListType;

  const todo = useSelector((state: RootStateType) => state.todo) as Task[];

  const [list, setList] = useState(tasklist);

  const [currentPage, setCurrentPage] = useState(1);

  let PageSize = 12;

  const currentData = useMemo(() => {
    const firstPageIndex = (currentPage - 1) * PageSize;
    const lastPageIndex = firstPageIndex + PageSize;
    return list.slice(firstPageIndex, lastPageIndex);
  }, [currentPage, PageSize, list]);

  useEffect(() => {
    setList(tasklist);
  }, [tasklist]);

  useEffect(() => {
    dispatch(getlistFetch());
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

  const searchHandler = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    const list = tasklist.filter((task) => task.title.includes(value));
    setList(list);
  };

  return (
    <>
      <Box
        component="form"
        sx={{
          "& .MuiTextField-root": { m: 0, width: "100%" },
        }}
        noValidate
        autoComplete="off"
      >
        <Paper variant="outlined">
          <TextField
            fullWidth
            id="outlined-basic"
            label="Search"
            variant="outlined"
            onChange={searchHandler}
          />
        </Paper>
      </Box>

      <div className="wrapper" style={{ marginTop: "10px" }}>
        {currentData.map((task) => (
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
      <div className="pagination">
        <Pagination
          siblingCount
          className="pagination-bar"
          currentPage={currentPage}
          totalCount={list.length}
          pageSize={PageSize}
          onPageChange={(page: number) => setCurrentPage(page)}
        />
      </div>
      {list.length === 0 && <h2>Task not found</h2>}
    </>
  );
};

export default TaskList;
