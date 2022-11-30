import React from "react";
import { createRoot } from "react-dom/client";
import './index.css';

import Root from "./pages/Root";
import Studios from "./pages/Studios";
import Classes from "./pages/Classes";
import Subscriptions from "./pages/Subscriptions";
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
    path: "studios/",
    element: <Studios />,
  },
  {
    path: "classes/",
    element: <Classes />,
  },
  {
    path: "subscriptions/",
    element: <Subscriptions />,
  },
  {
    path: "login/",
    element: <Login />,
  },
]);

createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
);