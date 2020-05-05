import { useEffect, useRef } from "react";

type AsyncCall<T> = () => Promise<T>;
type Callback<T> = (data: T) => void;

export default function useAsync<T>(
  theCall: AsyncCall<T>,
  callback: Callback<T>,
  handleError: any
) {
  const mountedRef = useRef(true);

  useEffect(() => {
    theCall()
      .then((res) => {
        if (!mountedRef.current) return null;
        callback(res);
      })
      .catch(handleError);
    return () => {
      mountedRef.current = false;
    };
  }, [theCall, callback, handleError]);
}
