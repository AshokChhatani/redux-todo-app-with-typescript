import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import Home from "./pages/Home";
import TodoList from "./pages/TodoList";
import Navbar from "./components/Navbar";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "./store/store";
import Login from "./pages/Login";

function App() {
  return (
    <div className="App">
      <Provider store={store}>
        <PersistGate loading={<div>Loading...</div>} persistor={persistor}>
          <BrowserRouter>
            <Navbar />
            <Routes>
              <Route path="/" element={<Home />}></Route>
              <Route path="/login" element={<Login />}></Route>
              <Route path="/list" element={<TodoList />}></Route>
            </Routes>
          </BrowserRouter>
        </PersistGate>
      </Provider>
    </div>
  );
}

export default App;
