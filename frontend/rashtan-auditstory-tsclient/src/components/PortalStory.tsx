import React, { useEffect, useState } from "react";
import { Redirect } from "react-router";
import IApiService from "../services/IApiService";
import { CompanyProfile } from "../models/CompanyProfile";
import { showError } from "../models/Errors";

interface Props {
  apiService: IApiService;
  ticker: string;
}

const PortalStory: React.FC<Props> = ({ apiService, ticker }) => {
  const [company, setCompany] = useState<CompanyProfile>();

  useEffect(() => {
    apiService
      .getCompany(ticker)
      .then(setCompany)
      .catch(showError);
  }, [apiService, ticker]);

  if (!ticker) return <Redirect to="/" />;

  return (
    <React.Fragment>
      {ticker}
      {company && " - " + company.name}
    </React.Fragment>
  );
};

export default PortalStory;
