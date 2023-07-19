import { Login } from "../authPages/login";
import { Register } from "../authPages/register";

export const routes = [
  {
    id: "login",
    path: "/login",
    element: <Login />,
  },
  {
    id: "register",
    path: "/register",
    element: <Register />,
  },
] as const;
