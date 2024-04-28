import MainLayout from "../layout/MainLayout";
import About from "../pages/About";
import AddProduct from "../pages/AddProduct";
import Cart from "../pages/Cart";
import EditProduct from "../pages/EditProduct";
import Home from "../pages/Home";
import ProductDetail from "../pages/ProductDetail";
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
      {
        path: "add-products",
        element: <AddProduct />,
      },
      {
        path: "product-detail/:id",
        element: <ProductDetail />,
      },
      {
        path: "product-edit/:id",
        element: <EditProduct />,
      },
      {
        path: "/cart",
        element: <Cart />,
      },
    ],
  },
];
