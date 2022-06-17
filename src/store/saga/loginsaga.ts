import axios, { AxiosResponse } from "axios";
import { call, put, takeEvery } from "redux-saga/effects";
import { loginFailure, loginStart, loginSuccess } from "../loginSlice";
import { LoginData } from "../types";

function* loginApiSaga(user: { type: string; payload: LoginData }) {
  const { payload } = user;

  try {
    const data: AxiosResponse = yield call(() =>
      axios.post("https://reqres.in/api/login", payload)
    );
    localStorage.setItem("token", data.data.token);
    yield put(loginSuccess(data));
  } catch (err) {
    yield put(loginFailure());
  }
}

function* loginSaga() {
  yield takeEvery(loginStart.type, loginApiSaga);
}

export default loginSaga;
