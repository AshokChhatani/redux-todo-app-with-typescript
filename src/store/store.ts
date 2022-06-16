import { combineReducers, configureStore } from "@reduxjs/toolkit";
import tasklistSlice from "./tasklistSlice";
import todoSlice from "./todoSlice";
import createSagaMiddleware from "redux-saga";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // defaults to localStorage for web
import loginSlice from "./loginSlice";
import listSaga from "./saga/tasklistsaga";
import { all, fork } from "redux-saga/effects";
import loginSaga from "./saga/loginsaga";

const rootReducer = combineReducers({
  tasklist: tasklistSlice,
  todo: todoSlice,
  login: loginSlice,
});

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["todo", "login"],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const saga = createSagaMiddleware();

export const store = configureStore({
  reducer: persistedReducer,
  middleware: [saga],
});

function* sagas() {
  yield all([fork(listSaga), fork(loginSaga)]);
}
saga.run(sagas);

export const persistor = persistStore(store);

export type RootStateType = ReturnType<typeof rootReducer>;
