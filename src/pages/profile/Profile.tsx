import { Typography } from "@mui/material";
import s from "./Profile.module.scss";
import { useAction } from "../../hooks/useActions";
import { useNavigate } from "react-router-dom";
export const Profile = () => {
  const { AuthLogout } = useAction();
  const navigate = useNavigate();

  const signOutHandle = () => {
    AuthLogout();
    localStorage.removeItem("token");
    navigate("/login");
  };
  return (
    <div>
      <Typography variant="h6" gutterBottom>
        Here could be user data in case he/she could have willing to update data
      </Typography>

      <button className={s.signOut} onClick={signOutHandle}>
        Sign out
      </button>
    </div>
  );
};
