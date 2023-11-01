import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import WeatherInfo from "./pages/SecondPage";
import "./index.css";
import { createBrowserRouter, RouterProvider, Route } from "react-router-dom";

const router = createBrowserRouter([
  // routing links to the homepage(app) and second page using react router
  {
    path: "/",
    element: <App></App>,
  },
  {
    path: "pages/:id",
    element: <WeatherInfo></WeatherInfo>,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
