import axios from "axios";
import { call, put, takeEvery } from "redux-saga/effects";
import { loginFailure, loginStart, loginSuccess } from "../loginSlice";
import { Login_Data, Response } from "../types";

function* loginapisaga(user: { type: string; payload: Login_Data }) {
  const { payload } = user;

  try {
    const data: Response = yield call(() =>
      axios.post("https://reqres.in/api/login", payload)
    );
    localStorage.setItem("token", data.data.token);
    yield put(loginSuccess(data));
  } catch (err) {
    yield put(loginFailure());
  }
}

function* loginSaga() {
  yield takeEvery(loginStart.type, loginapisaga);
}

export default loginSaga;
