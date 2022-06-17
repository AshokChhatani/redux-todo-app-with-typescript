import axios, { AxiosResponse } from "axios";
import { call, put, takeEvery } from "redux-saga/effects";
import { getlistFailure, getlistFetch, getlistSuccess } from "../tasklistSlice";

function* fetchTaskListSaga() {
  try {
    const list: AxiosResponse = yield call(() =>
      axios.get("https://jsonplaceholder.typicode.com/todos")
    );
    yield put(getlistSuccess(list.data));
  } catch (err) {
    yield put(getlistFailure());
  }
}

function* listSaga() {
  yield takeEvery(getlistFetch.type, fetchTaskListSaga);
}

export default listSaga;
