import React, { useState, useEffect } from "react";
import { Redirect } from "react-router";
import { makeStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import SideNavBar from "./SideNavBar";
import CompanyCard from "./CompanyCard";
import ApiService from "../../services/ApiService";
import { CompanyInfo } from "../../models/CompanyInfo";

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex"
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: "100vh",
    overflow: "auto"
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4)
  },
  paper: {
    padding: theme.spacing(2),
    display: "flex",
    overflow: "auto",
    flexDirection: "column"
  },
  fixedHeight: {
    height: 240
  },
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8)
  }
}));

interface PortalProps {
  apiService: ApiService;
}

const Portal: React.FC<PortalProps> = ({ apiService }) => {
  const classes = useStyles();
  const [companies, setState] = useState<CompanyInfo[]>([]);

  useEffect(() => {
    apiService
      .getCompanies()
      .then(data => {
        setState(data);
      })
      .catch(error => console.log(error));
  }, [apiService]);

  if (!apiService.isAuthenticated()) {
    return <Redirect to="/" />;
  }

  return (
    <div className={classes.root}>
      <CssBaseline />
      <SideNavBar />

      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container className={classes.cardGrid} maxWidth="md">
          <Grid container spacing={4}>
            {companies.map(c => (
              <CompanyCard company={c} />
            ))}
          </Grid>
        </Container>
      </main>
    </div>
  );
};

export default Portal;
