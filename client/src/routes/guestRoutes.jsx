import MinimunLayout from "../layout/MinimunLayout";
import Login from "../pages/Login";
import Registration from "../pages/Registration";

export const guestRoutes = [
  {
    path: "/",
    element: <MinimunLayout />,
    children: [
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
