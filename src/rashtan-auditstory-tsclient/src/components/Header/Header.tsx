import React from "react";
import Link from "@material-ui/core/Link";
import Toolbar from "@material-ui/core/Toolbar";
import Grid from "@material-ui/core/Grid";
import { Button } from "@material-ui/core";
import { AccountBalanceWallet } from "@material-ui/icons";

import { styleToolbar } from "../../lib/SharedStyles";

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
  return (
    <div
      style={{
        overflow: "hidden",
        position: "relative",
        display: "block",
        top: "0px",
        transition: "top 0.5s ease-in"
      }}
    >
      <Toolbar style={styleToolbar}>
        <Grid
          container
          direction="row"
          justify="space-around"
          alignItems="center"
        >
          <Grid item sm={6} xs={1} style={{ textAlign: "left" }}>
            <Link href="/">
              <AccountBalanceWallet
                style={{ margin: "0px auto 0px 10px", cursor: "pointer" }}
              />
            </Link>
          </Grid>
          <Grid item sm={4} xs={9} style={{ textAlign: "right" }}>
            <div>
              <Link href="/about">About </Link>
              <Link href="/contact">Contact </Link>
              {loggedIn ? (
                <div>
                  <Link href="/portal">Portal </Link>
                  <Button
                    style={{ margin: "0px 20px 0px auto" }}
                    onClick={logOut}
                  >
                    Log out
                  </Button>
                </div>
              ) : (
                <Button style={{ margin: "0px 20px 0px auto" }} onClick={logIn}>
                  Log in
                </Button>
              )}
            </div>
          </Grid>
        </Grid>
      </Toolbar>
    </div>
  );
};

export default Header;
