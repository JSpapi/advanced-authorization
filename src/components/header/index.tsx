import {
  AdminPanelSettings,
  Login,
  Person,
  Security,
} from "@mui/icons-material";
import { Avatar, Button, Typography } from "@mui/material";
import { Link, useLocation } from "react-router-dom";
import { useUser } from "../../hooks/useUsers";
import s from "./index.module.scss";

interface LocationParams {
  pathname: string;
  state: string | null;
  search: string;
  hash: string;
  key: string;
}

export const Header = () => {
  const loc: LocationParams = useLocation();

  const { user } = useUser();
  return (
    <nav className={s.nav}>
      <Link to="/">
        <Button startIcon={<Security />} color="inherit">
          <Typography className="regular">Advanced Auth</Typography>
        </Button>
      </Link>
      {user ? (
        <div className={s.nav_left}>
          <Link to="/admin">
            <Button startIcon={<AdminPanelSettings />} color="inherit">
              <Typography className="regular">Админка</Typography>
            </Button>
          </Link>
          <Link to="/profile">
            <Avatar
              alt="User"
              src={user.profile || ""}
              sx={{
                backgroundImage:
                  "linear-gradient(to top, #48c6ef 0%, #6f86d6 100%)",
                width: 35,
                height: 35,
              }}
            />
          </Link>
        </div>
      ) : (
        <div>
          {(loc.pathname === "/login" || loc.pathname === "/") && (
            <Link to="/register" state="Зарегестрироваться">
              <Button startIcon={<Login />} color="inherit">
                <Typography className="regular">Зарегестрироваться</Typography>
              </Button>
            </Link>
          )}
          {loc.pathname === "/register" && (
            <Link to="/login" state="Войти">
              <Button startIcon={<Person />} color="inherit">
                <Typography className="regular">Войти</Typography>
              </Button>
            </Link>
          )}
        </div>
      )}
    </nav>
  );
};
