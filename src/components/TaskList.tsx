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

let PageSize = 12;

const TaskList = () => {
  const dispatch = useDispatch();

  const { tasklist, status } = useSelector(
    (state: RootStateType) => state.tasklist
  ) as TaskListType;

  const todo = useSelector((state: RootStateType) => state.todo) as Task[];

  const [list, setList] = useState(tasklist);
  const [searchValue, setSearchValue] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const currentData = useMemo(() => {
    const firstPageIndex = (currentPage - 1) * PageSize;
    const lastPageIndex = firstPageIndex + PageSize;
    return list?.slice(firstPageIndex, lastPageIndex);
  }, [currentPage, PageSize, list]);

  const todoIds = useMemo(() => todo.map((t) => t.id), [todo]);

  useEffect(() => {
    dispatch(getlistFetch());
  }, [dispatch]);

  useEffect(() => {}, [list]);

  useEffect(() => {
    setList(
      tasklist.filter(
        (task) => !todoIds.includes(task.id) && task.title.includes(searchValue)
      )
    );
  }, [tasklist, todo, todoIds, searchValue]);

  const handleAdd = (task: Task) => {
    dispatch(add(task));
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
    setSearchValue(event.target.value);

    setList(
      tasklist.filter(
        (task) =>
          !todoIds.includes(task.id) && task.title.includes(event.target.value)
      )
    );
    setCurrentPage(1);
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
            value={searchValue}
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
