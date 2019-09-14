import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import SideNavBar from "./SideNavBar/SideNavBar";
import ApiService from "../services/ApiService";

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
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8)
  }
}));

interface PortalProps {
  apiService: ApiService;
  children: React.ReactNode;
  logOut: () => void;
}

const PortalLayout: React.FC<PortalProps> = ({
  apiService,
  children,
  logOut
}) => {
  const classes = useStyles();

  if (!apiService.authService.isAuthenticated()) {
    apiService.authService.logIn();
    return <></>;
  }

  return (
    <div className={classes.root}>
      <SideNavBar apiService={apiService} logOut={logOut} />

      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container className={classes.cardGrid} maxWidth="md">
          <Grid container spacing={4}>
            {children}
          </Grid>
        </Container>
      </main>
    </div>
  );
};

export default PortalLayout;
