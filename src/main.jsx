import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import WeatherInfo from "./pages/SecondPage";
import "./index.css";
import { createBrowserRouter, RouterProvider, Route } from "react-router-dom";
import { HOME_ROUTE, SECOND_PAGE } from "./data/constants";

const router = createBrowserRouter([
  // routing links to the homepage(app) and second page using react router
  {
    path: HOME_ROUTE,
    element: <App></App>,
  },
  {
    path: SECOND_PAGE,
    element: <WeatherInfo></WeatherInfo>,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
);
