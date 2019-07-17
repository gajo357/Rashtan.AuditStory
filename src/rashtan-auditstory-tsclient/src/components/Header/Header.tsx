import React from "react";
import { Toolbar, IconButton, Button } from "@material-ui/core";
import { AccountBalanceWallet } from "@material-ui/icons";
import { makeStyles } from "@material-ui/core/styles";
import { styleToolbar } from "../../lib/SharedStyles";
import LocalLink from "../../lib/LocalLink";

const useStyles = makeStyles(theme => ({
  toolbar: {
    paddingRight: 24 // keep right padding when drawer closed
  },
  toolbarIcon: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: "0 8px",
    ...theme.mixins.toolbar
  },
  menuButton: {
    marginRight: 36
  },
  menuButtonHidden: {
    display: "none"
  },
  title: {
    flexGrow: 1
  }
}));

interface HeaderProps {
  loggedIn: boolean;
  logIn: () => void;
  logOut: () => void;
}

const Header: React.FC<HeaderProps> = ({
  loggedIn,
  logIn,
  logOut
}: HeaderProps) => {
  const classes = useStyles();

  return (
    <Toolbar style={styleToolbar} className={classes.toolbar}>
      <IconButton
        edge="start"
        color="inherit"
        aria-label="Home"
        className={classes.menuButton}
      >
        <LocalLink to="/">
          <AccountBalanceWallet />
        </LocalLink>
      </IconButton>

      <IconButton color="inherit">
        <LocalLink to="/about">About</LocalLink>
      </IconButton>
      <IconButton color="inherit">
        <LocalLink to="/contact">Contact</LocalLink>
      </IconButton>
      {loggedIn && (
        <IconButton color="inherit">
          <LocalLink to="/portal">Portal</LocalLink>
        </IconButton>
      )}
      {loggedIn && (
        <Button color="primary" onClick={logOut}>
          Log out
        </Button>
      )}
      {!loggedIn && (
        <Button color="primary" onClick={logIn}>
          Log in
        </Button>
      )}
    </Toolbar>
  );
};

export default Header;
