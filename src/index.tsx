import React, { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createHashRouter, RouterProvider } from "react-router-dom";
import FixedFilter from "./page/FixedFilter/FixedFilter";
import Home from "./page/Home/Home";
import NormalFilter from "./page/NormalFilter/NormalFilter";

const router = createHashRouter([
  {
    path: "/",
    element: <Home />,
    children: [
      {
        path: "normal",
        element: <NormalFilter />,
      },
      {
        path: "fixed",
        element: <FixedFilter />,
      },
    ],
  },
]);

const container = document.getElementById("root");
const root = createRoot(container!);
root.render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
