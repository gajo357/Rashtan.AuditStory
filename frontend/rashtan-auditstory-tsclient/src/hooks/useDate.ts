import { useEffect, useState } from "react";

interface DateMethods {
  toDateString: (input: string) => string;
  toDateTimeString: (input: string) => string;
  toTimeString: (input: string) => string;
}

const toDateString = (input: string) =>
  new Date(input).toLocaleDateString("de-DE", {
    month: "2-digit",
    day: "2-digit",
    year: "numeric"
  });

const toDateTimeString = (input: string) =>
  new Date(input).toLocaleString("de-DE", {
    month: "2-digit",
    day: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit"
  });

const toTimeString = (input: string) =>
  new Date(input).toLocaleString("de-DE", {
    hour: "2-digit",
    minute: "2-digit"
  });

const useDate = () => {
  const [exports, setExports] = useState<DateMethods>({
    toDateString,
    toDateTimeString,
    toTimeString
  });

  useEffect(() => {
    setExports({ toDateString, toDateTimeString, toTimeString });
  }, []);

  return exports;
};

export default useDate;
