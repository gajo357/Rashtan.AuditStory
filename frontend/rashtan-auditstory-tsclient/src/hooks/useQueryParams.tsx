import { useEffect, useState } from "react";
import { useLocation } from "react-router";

interface QueryParams {
  invitationCode: string | null;
}

const useQueryParams = () => {
  const location = useLocation();

  const [exports, setExports] = useState<QueryParams>({
    invitationCode: null
  });

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    setExports({
      invitationCode: urlParams.get("code")
    });
  }, [location]);

  return exports;
};

export default useQueryParams;
