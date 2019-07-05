import React, { useEffect, useState } from "react";
import ApiService from "../../services/ApiService";
import { CompanyInfo } from "../../models/CompanyInfo";
import { List, ListItem, ListItemIcon, ListItemText } from "@material-ui/core";
import { CreditCard } from "@material-ui/icons";
import { Redirect } from "react-router";

interface PortalProps {
  apiService: ApiService;
}

interface PortalState {
  companies: CompanyInfo[];
}

const Portal: React.FC<PortalProps> = ({ apiService }) => {
  const [{ companies }, setState] = useState<PortalState>({ companies: [] });

  useEffect(() => {
    apiService
      .getCompanies()
      .then(data => {
        setState({ companies: data });
      })
      .catch(error => console.log(error));
  }, [apiService]);

  if (!apiService.isAuthenticated()) {
    return <Redirect to="/" />;
  }

  return (
    <div>
      Portal
      <div>
        <List component="nav" aria-label="Companies">
          {companies.map(c => (
            <ListItem button key={c.ticker}>
              <ListItemIcon>
                <CreditCard />
              </ListItemIcon>
              <ListItemText primary={c.name} />
              <ListItemText primary={c.ticker} />
            </ListItem>
          ))}
        </List>
      </div>
    </div>
  );
};

export default Portal;
