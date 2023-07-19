import { AdminPanelSettings, Login, Person } from "@mui/icons-material";
import { Button, Typography } from "@mui/material";
import { Link, useLocation } from "react-router-dom";
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

  return (
    <header className={s.header}>
      <Link to="/">
        <Button startIcon={<AdminPanelSettings />} color="inherit">
          <Typography className="regular">Advanced Auth</Typography>
        </Button>
      </Link>

      {loc.state ? (
        <Link to="/login">
          <Button startIcon={<Login />} color="inherit">
            <Typography className="regular">{loc.state}</Typography>
          </Button>
        </Link>
      ) : (
        <Link to="/register" state="Войти">
          <Button startIcon={<Person />} color="inherit">
            <Typography className="regular">Зарегестрироваться</Typography>
          </Button>
        </Link>
      )}
    </header>
  );
};
