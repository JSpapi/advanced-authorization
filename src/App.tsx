import { Container, createTheme, ThemeProvider } from "@mui/material";
import { Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { Home } from "./pages/home";
import { routes } from "./routes";
import "react-toastify/dist/ReactToastify.css";

import { Sharedlayout } from "./components/layout/Sharedlayout";
import { AuthLoading } from "./authPages/AuthLoading";
import { useUser } from "./hooks/useUsers";
import { Login } from "./authPages/login";
import { NotFound } from "./pages/notFound/NotFound";
const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

function App() {
  const { isAuthenticated } = useUser();

  const setRoutes = () =>
    routes.map(({ id, path, element, isPrivate, isMenu }) => {
      if (isPrivate && isAuthenticated && isMenu) {
        return <Route id={id} path={path} element={element} key={id} />;
      } else if (!isPrivate && !isAuthenticated) {
        return <Route id={id} path={path} element={element} key={id} />;
      } else return <Route path="*" element={<NotFound />} key={"not-found"} />;
    });

  return (
    <ThemeProvider theme={darkTheme}>
      <AuthLoading>
        <>
          <Container maxWidth="lg">
            <Routes>
              <Route path="/" element={<Sharedlayout />}>
                {isAuthenticated ? (
                  <Route index element={<Home />} />
                ) : (
                  <Route index element={<Login />} />
                )}
                {setRoutes()}
              </Route>
            </Routes>
          </Container>
          <ToastContainer theme="dark" />
        </>
      </AuthLoading>
    </ThemeProvider>
  );
}

export default App;
