import { Dispatch, SetStateAction, useEffect } from "react";

export function useSuccess(
  success: string,
  setSuccess: Dispatch<SetStateAction<string>>,
) {
  useEffect(() => {
    if (success) {
      const timer = setTimeout(() => {
        setSuccess("");
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [success, setSuccess]);
}
