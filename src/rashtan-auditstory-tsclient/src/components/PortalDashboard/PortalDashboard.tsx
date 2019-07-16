import React, { useState, useEffect } from "react";
import { History } from "history";
import CompanyCard from "./CompanyCard";
import ApiService from "../../services/ApiService";
import { CompanyInfo } from "../../models/CompanyInfo";
import PortalLayout from "../PortalLayout";

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
    <PortalLayout authService={apiService.authService}>
      {companies.map(c => (
        <CompanyCard company={c} history={history} key={c.ticker} />
      ))}
    </PortalLayout>
  );
};

export default PortalDashboard;
