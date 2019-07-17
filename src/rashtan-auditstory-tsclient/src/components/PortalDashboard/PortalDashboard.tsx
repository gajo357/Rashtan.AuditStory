import React, { useState, useEffect } from "react";
import { History } from "history";
import CompanyCard from "./CompanyCard";
import ApiService from "../../services/ApiService";
import { CompanyInfo } from "../../models/CompanyInfo";

interface PortalProps {
  apiService: ApiService;
  history: History;
}

const PortalDashboard: React.FC<PortalProps> = ({ apiService, history }) => {
  const [companies, setState] = useState<CompanyInfo[]>([]);

  useEffect(() => {
    apiService
      .getCompanies()
      .then(data => {
        setState(data);
      })
      .catch(error => console.log(error));
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
