import React from "react";
import { Link as RouterLink } from "react-router-dom";
import { Link, Toolbar, IconButton, Button } from "@material-ui/core";
import { AccountBalanceWallet } from "@material-ui/icons";
import { makeStyles } from "@material-ui/core/styles";
import MenuIcon from "@material-ui/icons/Menu";
import { styleToolbar } from "../../lib/SharedStyles";

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
        <Link to="/" component={RouterLink}>
          <AccountBalanceWallet />
        </Link>
      </IconButton>
      <MenuIcon />

      <IconButton color="inherit">
        <Link to="/about" component={RouterLink}>
          About
        </Link>
      </IconButton>
      <IconButton color="inherit">
        <Link to="/contact" component={RouterLink}>
          Contact
        </Link>
      </IconButton>
      {loggedIn && (
        <IconButton color="inherit">
          <Link to="/portal" component={RouterLink}>
            Portal
          </Link>
        </IconButton>
      )}
      {loggedIn && (
        <Button color="inherit" onClick={logOut}>
          Log out
        </Button>
      )}
      {!loggedIn && (
        <Button color="inherit" onClick={logIn}>
          Log in
        </Button>
      )}
    </Toolbar>
  );
};

export default Header;
