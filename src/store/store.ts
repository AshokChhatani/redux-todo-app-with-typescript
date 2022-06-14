import { combineReducers, configureStore } from "@reduxjs/toolkit";
import tasklistSlice from "./tasklistSlice";
import todoSlice from "./todoSlice";

import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage"; // defaults to localStorage for web
import loginSlice from "./loginSlice";

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

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);

export type RootStateType = ReturnType<typeof rootReducer>;
