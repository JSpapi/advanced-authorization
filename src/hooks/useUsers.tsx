import { useTypedSelectors } from "./useTypedSelectors";

export const useUser = () => {
  const { user } = useTypedSelectors((state) => state.auth);
  return { user };
};
