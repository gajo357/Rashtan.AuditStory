import React, { useEffect, useState } from "react";
import { History } from "history";
import IApiService from "../services/IApiService";
import { CompanyProfile } from "../models/CompanyProfile";
import CompanyCard from "./PortalDashboard/CompanyCard";
import { showError } from "../models/Errors";

interface Props {
  apiService: IApiService;
  folder: string;
  history: History;
}

const PortalFolders: React.FC<Props> = ({ apiService, folder, history }) => {
  const [companies, setCompanies] = useState<CompanyProfile[]>([]);
  useEffect(() => {
    apiService
      .getFolderCompanies(folder)
      .then(setCompanies)
      .catch(showError);
  }, [apiService, folder]);

  return (
    <React.Fragment>
      {companies.map(c => (
        <CompanyCard company={c} history={history} key={c.ticker} />
      ))}
    </React.Fragment>
  );
};

export default PortalFolders;
