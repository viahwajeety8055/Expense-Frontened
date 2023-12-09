import { Outlet, Route, Routes } from "react-router-dom";
import Container from "./Component/Container/container";
import store from "./redux/store";
import { Provider } from "react-redux";
import Login from "./Component/login/login";
import Register from "./Component/register/register";
import Home from "./Component/Home/home";
import Graph from "./Component/Graph/graph";

function App() {
  return (
    <>
      <Outlet />
    </>
  );
}

export default App;
