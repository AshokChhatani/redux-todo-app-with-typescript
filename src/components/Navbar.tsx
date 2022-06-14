import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootStateType } from "../store/store";
import { Login, Task } from "../store/types";
import { logout } from "../store/loginSlice";

const Navbar = () => {
  const items = useSelector((state: RootStateType) => state.todo) as Task[];
  const isLogin = useSelector((state: RootStateType) => state.login) as Login;
  const dispatch = useDispatch();

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <span className="logo">TO DO's</span>
      <div>
        {isLogin.login ? (
          <>
            <Link className="navLink" to="/">
              Home
            </Link>

            <Link className="navLink" to="/list">
              To Do List
            </Link>

            <Link
              className="navLink"
              to="/login"
              onClick={() => dispatch(logout())}
            >
              Logout
            </Link>

            <span className="total">Total: {items.length}</span>
          </>
        ) : (
          <>
            <Link className="navLink" to="/login">
              Login
            </Link>
          </>
        )}
      </div>
    </div>
  );
};

export default Navbar;
