import MainLayout from "../layout/MainLayout";
import Home from "../pages/Home";

export const mainRoutes = [
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "home",
        element: <Home />,
      },
    ],
  },
];
