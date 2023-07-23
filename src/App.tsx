import { Container, createTheme, ThemeProvider } from "@mui/material";
import { Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { Home } from "./pages/home";
import { routes } from "./routes";
import "react-toastify/dist/ReactToastify.css";

import { Sharedlayout } from "./components/layout/Sharedlayout";
const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

function App() {
  const setRoutes = () =>
    routes.map(({ id, path, element }) => (
      <Route key={id} path={path} element={element} />
    ));

  return (
    <ThemeProvider theme={darkTheme}>
      <>
        <Container maxWidth="lg">
          <Routes>
            <Route path="/" element={<Sharedlayout />}>
              <Route index element={<Home />} />
              {setRoutes()}
            </Route>
          </Routes>
        </Container>
        <ToastContainer />
      </>
    </ThemeProvider>
  );
}

export default App;
