import React, { useEffect, useState } from "react";
import { Redirect } from "react-router";
import ApiService from "../../services/ApiService";
import PortalLayout from "../PortalLayout";
import { CompanyInfo } from "../../models/CompanyInfo";

interface Props {
  apiService: ApiService;
  ticker: string;
}

const PortalStory: React.FC<Props> = ({ apiService, ticker }) => {
  const [company, setCompany] = useState<CompanyInfo>();

  useEffect(() => {
    apiService.getCompany(ticker).then(c => setCompany(c));
  }, [apiService, ticker]);

  if (!ticker) return <Redirect to="/portal" />;

  return (
    <PortalLayout authService={apiService.authService}>
      {ticker}
      {company && " - " + company.name}
    </PortalLayout>
  );
};

export default PortalStory;
