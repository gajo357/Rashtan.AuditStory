import React, { useEffect, useState } from "react";
import { History } from "history";
import ApiService from "../../services/ApiService";
import { CompanyProfile } from "../../models/CompanyProfile";
import CompanyCard from "../PortalDashboard/CompanyCard";

interface Props {
  apiService: ApiService;
  folder: string;
  history: History;
}

const PortalFolders: React.FC<Props> = ({ apiService, folder, history }) => {
  const [companies, setCompanies] = useState<CompanyProfile[]>([]);
  useEffect(() => {
    apiService.getFolderCompanies(folder).then(c => setCompanies(c));
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
