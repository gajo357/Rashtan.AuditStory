import React from "react";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";

import { styleRaisedButton, styleH1 } from "../../lib/SharedStyles";

const Home: React.FC = () => (
  <div style={{ padding: "10px 8%", fontSize: "15px" }}>
    <Grid container direction="row" justify="space-around">
      <Grid item sm={12} xs={12} style={{ textAlign: "center" }}>
        <br />
        <h1 style={styleH1}>Audit Story</h1>
        <p>
          Open source web app (MIT License) to publish documentation and books.
        </p>
        <p style={{ textAlign: "center" }}>
          <Button
            href="https://github.com/gajo357/Rashtan.AuditStory"
            target="_blank"
            variant="contained"
            color="secondary"
            style={styleRaisedButton}
          >
            Github
          </Button>
        </p>
      </Grid>
    </Grid>
  </div>
);

export default Home;
