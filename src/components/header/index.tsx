import { AdminPanelSettings, Login, Person } from "@mui/icons-material";
import { Avatar, Button, Typography } from "@mui/material";
import { Link, useLocation } from "react-router-dom";
import { useUser } from "../../hooks/useUsers";
import s from "./index.module.css";

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
    <header className={s.header}>
      <Link to="/">
        <Button startIcon={<AdminPanelSettings />} color="inherit">
          <Typography className="regular">Advanced Auth</Typography>
        </Button>
      </Link>
      {user ? (
        <Link to="/profile" state="Зарегестрироваться">
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
      ) : (
        <div>
          {loc.pathname === "/login" && (
            <Link to="/register" state="Зарегестрироваться">
              <Button startIcon={<Login />} color="inherit">
                <Typography className="regular">Зарегестрироваться</Typography>
              </Button>
            </Link>
          )}
          {(loc.pathname === "/register" || loc.pathname === "/") && (
            <Link to="/login" state="Войти">
              <Button startIcon={<Person />} color="inherit">
                <Typography className="regular">Войти</Typography>
              </Button>
            </Link>
          )}
        </div>
      )}
    </header>
  );
};
