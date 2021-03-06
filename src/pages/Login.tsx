import { Button, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loginStart } from "../store/loginSlice";
import { RootStateType } from "../store/store";
import { Login as LoginType } from "../store/types";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();

  const isLogin = useSelector(
    (state: RootStateType) => state.login
  ) as LoginType;
  const navigate = useNavigate();

  useEffect(() => {
    if (isLogin.login) {
      navigate("/");
    }
  }, [isLogin, navigate]);

  const loginhandler = () => {
    const user = { email, password };
    dispatch(loginStart(user));
  };
  return (
    <>
      <h1>Login</h1>
      {isLogin.status === "loading" && (
        <>
          <div>Loading...</div>
          <br />
        </>
      )}
      <TextField
        id="outlined-basic"
        label="Email"
        variant="outlined"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <br />
      <br />
      <TextField
        id="outlined-basic"
        label="Password"
        variant="outlined"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <br />
      <br />
      <Button variant="contained" onClick={loginhandler}>
        Login
      </Button>
    </>
  );
};
export default Login;
