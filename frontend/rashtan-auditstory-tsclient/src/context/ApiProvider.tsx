import React, { useContext } from "react";
import IApiService from "../services/IApiService";
import ApiService from "../services/ApiService";
import MockedApiService from "../services/MockedApiService";
import { useAuthContext } from "./AuthProvider";

const ApiContext = React.createContext<IApiService>(new MockedApiService());

const useApiService = () => useContext(ApiContext);

interface ProviderProps {
  children: React.ReactNode | React.ReactNode[];
}

const ApiProvider: React.FC<ProviderProps> = ({ children }) => {
  const { getAccessToken } = useAuthContext();
  const apiService = new MockedApiService();
  //   const apiService = new ApiService(getAccessToken);

  return (
    <ApiContext.Provider value={apiService}>{children}</ApiContext.Provider>
  );
};

export { ApiProvider, useApiService };
