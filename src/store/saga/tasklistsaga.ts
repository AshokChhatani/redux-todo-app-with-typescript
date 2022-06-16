import axios from "axios";
import { call, put, takeEvery } from "redux-saga/effects";
import { getlistFailure, getlistFetch, getlistSuccess } from "../tasklistSlice";
import { Response } from "../types";

function* fetchtasklistsaga() {
  try {
    const list: Response = yield call(() =>
      axios.get("https://jsonplaceholder.typicode.com/todos")
    );
    yield put(getlistSuccess(list.data));
  } catch (err) {
    yield put(getlistFailure);
  }
}

function* listSaga() {
  yield takeEvery(getlistFetch.type, fetchtasklistsaga);
}

export default listSaga;
