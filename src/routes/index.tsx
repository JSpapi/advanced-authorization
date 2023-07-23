import { Login } from "../authPages/login";
import { Register } from "../authPages/register";
import { ConfirmEmail } from "../authPages/forgetPaswrd/ConfirmEmail";
import { ConfirmOTPCode } from "../authPages/forgetPaswrd/ConfirmOTPCode";
import { ResetPassword } from "../authPages/forgetPaswrd/ResetPassword";

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
  {
    id: "confirmOTPCode",
    path: "/confirmOTPCode",
    element: <ConfirmOTPCode />,
  },
  {
    id: "confirmEmail",
    path: "/confirmEmail",
    element: <ConfirmEmail />,
  },
  {
    id: "resetPassword",
    path: "/resetPassword",
    element: <ResetPassword />,
  },
] as const;
