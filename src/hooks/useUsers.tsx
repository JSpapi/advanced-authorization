import { useTypedSelectors } from "./useTypedSelectors";

export const useUser = () => {
  const { user, isAuthenticated } = useTypedSelectors((state) => state.auth);
  return { user, isAuthenticated };
};
