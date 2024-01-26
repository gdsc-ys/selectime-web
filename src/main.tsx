import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import CreateMeet from "./routes/CreateMeet/CreateMeet.tsx";
import ErrorPage from "./error-page";

const router = createBrowserRouter([
  {
    path: "/",
    element: <CreateMeet />,
    errorElement: <ErrorPage />,
  },
  {
    path: "meet/:meetId",
    element: <Meet />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
