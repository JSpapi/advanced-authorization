import { Login } from "../authPages/login";
import { Register } from "../authPages/register";
import { ConfirmEmail } from "../authPages/forgetPaswrd/ConfirmName";
import { ConfirmOTPCode } from "../authPages/forgetPaswrd/ConfirmOTPCode";
import { ResetPassword } from "../authPages/forgetPaswrd/ResetPassword";
import { Profile } from "../pages/profile/Profile";
import { Admin } from "../pages/admin/Admin";

export const routes = [
  {
    id: "login",
    path: "/login",
    element: <Login />,
    isMenu: false,
    isPrivate: false,
  },
  {
    id: "register",
    path: "/register",
    element: <Register />,
    isMenu: false,
    isPrivate: false,
  },
  {
    id: "confirmOTPCode",
    path: "/confirmOTPCode",
    element: <ConfirmOTPCode />,
    isMenu: false,
    isPrivate: false,
  },
  {
    id: "confirmEmail",
    path: "/confirmEmail",
    element: <ConfirmEmail />,
    isMenu: false,
    isPrivate: false,
  },
  {
    id: "resetPassword",
    path: "/resetPassword",
    element: <ResetPassword />,
    isMenu: false,
    isPrivate: false,
  },
  {
    id: "profile",
    path: "/profile",
    element: <Profile />,
    isMenu: true,
    isPrivate: true,
  },
  {
    id: "admin",
    path: "/admin",
    element: <Admin />,
    isMenu: true,
    isPrivate: true,
  },
] as const;
