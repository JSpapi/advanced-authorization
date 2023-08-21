import loadingImg from "../assets/preloader.svg";
import { Preloader } from "../components/preloader/Preloader";
import { useCurrentQuery } from "../services/auth.api";
export const AuthLoading = ({ children }: { children: JSX.Element }) => {
  const { isLoading } = useCurrentQuery();

  if (isLoading) {
    return <Preloader image={loadingImg} />;
  }

  return children;
};
