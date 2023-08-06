import { TypedUseSelectorHook, useSelector } from "react-redux";
import { RootState } from "../store";

export const useTypedSelectors: TypedUseSelectorHook<RootState> = useSelector;
