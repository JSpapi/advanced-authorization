import loadingImg from "../assets/preloader.svg";
import { useCurrentQuery } from "../services/auth.api";
export const AuthLoading = ({ children }: { children: JSX.Element }) => {
  const { isLoading } = useCurrentQuery();

  if (isLoading) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <img src={loadingImg} alt="loading" />
      </div>
    );
  }

  return children;
};
