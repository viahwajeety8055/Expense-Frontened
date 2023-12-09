import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import {
  BrowserRouter,
  createBrowserRouter,
  Router,
  RouterProvider,
} from "react-router-dom";
import Container from "./Component/Container/container";
import ProfilePage from "./Component/Profile/profile";
import Graph from "./Component/Graph/graph";
import NotFoundPage from "./Component/NotFound/notfound";
import Home from "./Component/Home/home";
import Login from "./Component/login/login";
import Register from "./Component/register/register";
import App from "./App";
const router = createBrowserRouter([
  {
    path: "/",
    element: <Container />,
    children: [
      {
        path: "home",
        element: <Home />,
      },
      {
        path: "profile",
        element: <ProfilePage />,
      },
      {
        path: "graph",
        element: <Graph />,
      },
      {
        path: "notfound",
        element: <NotFoundPage />,
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
