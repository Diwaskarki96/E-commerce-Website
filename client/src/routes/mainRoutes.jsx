import MainLayout from "../layout/MainLayout";
import About from "../pages/About";
import Home from "../pages/Home";
import ProductList from "../pages/ProductList";

export const mainRoutes = [
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "home",
        element: <Home />,
      },
      {
        path: "about",
        element: <About />,
      },
      {
        path: "products",
        element: <ProductList />,
      },
    ],
  },
];
