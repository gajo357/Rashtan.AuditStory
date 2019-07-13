import React from "react";
import Toolbar from "@material-ui/core/Toolbar";
import Grid from "@material-ui/core/Grid";
import { Link, Typography } from "@material-ui/core";

import { styleToolbar } from "../../lib/SharedStyles";

const Footer: React.FC = () => (
  <div>
    <Toolbar style={styleToolbar}>
      <Grid
        container
        direction="row"
        justify="space-evenly"
        alignItems="center"
      >
        <Grid item sm={6} xs={1} style={{ textAlign: "left" }}>
          <Typography color="textPrimary">© 2019 Rashtan</Typography>
        </Grid>
        <Grid item sm={3} xs={1} style={{ textAlign: "center" }}>
          <Link href="/terms">Terms and conditions</Link>
        </Grid>
        <Grid item sm={2} xs={1} style={{ textAlign: "right" }}>
          <Link target="_blank" href="https://github.com/gajo357">
            Github
          </Link>
        </Grid>
      </Grid>
    </Toolbar>
  </div>
);

export default Footer;
