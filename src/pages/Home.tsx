import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import TaskList from "../components/TaskList";
import { Login } from "../store/types";
import { RootStateType } from "../store/store";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const isLogin = useSelector((state: RootStateType) => state.login) as Login;
  const navigate = useNavigate();
  useEffect(() => {
    if (!isLogin) {
      navigate("/login");
    }
  }, [isLogin, navigate]);

  return (
    <div>
      <section>
        <h3>TaskList</h3>
        <TaskList />
      </section>
    </div>
  );
};

export default Home;
