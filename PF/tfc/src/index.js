import React from "react";
import { createRoot } from "react-dom/client";
import './index.css';

import Root from "./pages/Root.jsx";
import Login from "./pages/Login";

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root/>,
  },
  {
    path: "login",
    element: <Login />,
  },
]);

createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
);