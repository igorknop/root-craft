import React from "react";
import ReactDOM from "react-dom/client";
import App from "./screens/App";
import "./index.css";
import { createBrowserRouter, RouterProvider, Link } from "react-router-dom";
import MainMenu from "./screens/MainMenu";
import RootElement from "./screens/RootElement";
import About from "./screens/About";
import Scoring from "./screens/Scoring";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainMenu />,
  },
  {
    path: "/techtree",
    element: <RootElement />,
  },
  {
    path: "/scoring",
    element: <Scoring />,
  },
  {
    path: "/about",
    element: <About />,
  },
  {
    path: "/play",
    element: <App />,
  },
]);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
