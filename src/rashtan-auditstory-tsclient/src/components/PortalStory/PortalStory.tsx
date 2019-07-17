import React, { useEffect, useState } from "react";
import { Redirect } from "react-router";
import ApiService from "../../services/ApiService";
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
    <React.Fragment>
      {ticker}
      {company && " - " + company.name}
    </React.Fragment>
  );
};

export default PortalStory;
