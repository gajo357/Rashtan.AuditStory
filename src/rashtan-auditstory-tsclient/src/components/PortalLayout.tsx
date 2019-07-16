import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import SideNavBar from "./SideNavBar/SideNavBar";
import AuthService from "../services/AuthService";

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
  authService: AuthService;
  children: React.ReactNode;
}

const PortaLayout: React.FC<PortalProps> = ({ authService, children }) => {
  const classes = useStyles();

  if (!authService.isAuthenticated()) {
    authService.login();
    return <React.Fragment />;
  }

  return (
    <div className={classes.root}>
      <SideNavBar />

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

export default PortaLayout;
