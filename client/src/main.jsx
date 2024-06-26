import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "./index.css";
import "./App.css";
import { guestRoutes } from "./routes/guestRoutes.jsx";
import { mainRoutes } from "./routes/mainRoutes.jsx";
import { Provider } from "react-redux";
import reduxStore from "./store/store.js";

const queryClient = new QueryClient();
const router = createBrowserRouter([...guestRoutes, ...mainRoutes]);
ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={reduxStore}>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  </Provider>
);
