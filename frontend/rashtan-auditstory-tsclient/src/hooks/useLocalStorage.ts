import { useCallback, useState } from "react";

const useLocalStorage: <T>(
  key: string,
  initialValue: T | null
) => [T | null, (v: T | null) => void] = <T>(
  key: string,
  initialValue: T | null
) => {
  // State to store our value
  // Pass initial state function to useState so logic is only executed once
  const [storedValue, setStoredValue] = useState<T | null>(() => {
    try {
      console.log(key);
      // Get from local storage by key
      const item = window.localStorage.getItem(key);
      // Parse stored json or if none return initialValue
      console.log(item);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      // If error also return initialValue
      console.log(error);
      return initialValue;
    }
  });

  const setValue = useCallback(
    (value: T | null) => {
      // Return a wrapped version of useState's setter function that ...
      // ... persists the new value to localStorage.
      try {
        console.log(value);
        // Save state
        setStoredValue(value);
        // Save to local storage
        if (value) window.localStorage.setItem(key, JSON.stringify(value));
        else window.localStorage.removeItem(key);
      } catch (error) {
        // A more advanced implementation would handle the error case
        console.log(error);
      }
    },
    [setStoredValue, window.localStorage]
  );

  return [storedValue, setValue];
};

export default useLocalStorage;
