import { IError } from "../types/errorMessage.type";

export const isErrorWithMessage = (error: unknown): error is IError => {
  return (
    typeof error === "object" &&
    error !== null &&
    "data" in error &&
    typeof (error as Record<string, unknown>).data === "object"
  );
};
