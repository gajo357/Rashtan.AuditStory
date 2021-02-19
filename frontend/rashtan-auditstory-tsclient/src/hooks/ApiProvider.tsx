import React, { useContext } from "react";
import IApiService from "../services/IApiService";
import ApiService from "../services/ApiService";
import MockedApiService from "../services/MockedApiService";
import useApi from "./useApi";

const ApiContext = React.createContext<IApiService>(new MockedApiService());

const useApiService = () => useContext(ApiContext);

interface ProviderProps {
  children: React.ReactNode | React.ReactNode[];
}

const ApiProvider: React.FC<ProviderProps> = ({ children }) => {
  const { apiGet, apiPost, apiPut, apiDelete } = useApi();
  // const apiService = new MockedApiService();
  const apiService = new ApiService(apiGet, apiPost, apiPut, apiDelete);

  return (
    <ApiContext.Provider value={apiService}>{children}</ApiContext.Provider>
  );
};

export { ApiProvider, useApiService };
