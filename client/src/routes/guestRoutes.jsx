import App from "../App";
import GuestGuard from "../guard/GuestGuard";
import MinimunLayout from "../layout/MinimunLayout";
import AddProduct from "../pages/AddProduct";
import Login from "../pages/Login";
import Registration from "../pages/Registration";

export const guestRoutes = [
  {
    path: "/",
    element: (
      <GuestGuard>
        <MinimunLayout />
      </GuestGuard>
    ),
    children: [
      {
        path: "/",
        element: <App />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "register",
        element: <Registration />,
      },
    ],
  },
];
