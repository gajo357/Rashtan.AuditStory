import React, { useState, useEffect } from "react";
import { History } from "history";
import CompanyCard from "./CompanyCard";
import IApiService from "../../services/IApiService";
import { CompanyProfile } from "../../models/CompanyProfile";
import { showError } from "../../models/Errors";

interface PortalProps {
  apiService: IApiService;
  history: History;
}

const PortalDashboard: React.FC<PortalProps> = ({ apiService, history }) => {
  const [companies, setCompanies] = useState<CompanyProfile[]>([]);

  useEffect(() => {
    apiService
      .getCompanies()
      .then(setCompanies)
      .catch(showError);
  }, [apiService]);

  return (
    <React.Fragment>
      {companies.map(c => (
        <CompanyCard company={c} history={history} key={c.ticker} />
      ))}
    </React.Fragment>
  );
};

export default PortalDashboard;
