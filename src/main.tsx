import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import CreateMeet from "./routes/CreateMeet/CreateMeet.tsx";
import ErrorPage from "./error-page";
import Meet from "./routes/Meet/Meet.tsx";
import { meetLoader } from "./routes/Meet/meetLoader.ts";

const router = createBrowserRouter([
  {
    path: "/",
    element: <CreateMeet />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "meet/:meetId",
        element: <Meet />,
        loader: meetLoader,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
