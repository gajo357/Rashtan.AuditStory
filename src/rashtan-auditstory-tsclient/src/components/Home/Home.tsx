import React from "react";
import ApiService from "../../services/ApiService";
import { CompanyInfo } from "../../models/CompanyInfo";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";

import { styleRaisedButton, styleH1 } from "../../lib/SharedStyles";

interface HomeProps {
  apiService: ApiService;
}

interface HomeState {
  companies: CompanyInfo[];
}

class Home extends React.Component<HomeProps, HomeState> {
  state: Readonly<HomeState> = {
    companies: []
  };
  componentDidMount() {
    this.props.apiService
      .getCompanies()
      .then(response => response.json())
      .then(data => {
        this.setState({ companies: data });
        console.log(data);
      })
      .catch(error => console.log(error));
  }

  render() {
    return (
      <div style={{ padding: "10px 8%", fontSize: "15px" }}>
        <Grid container direction="row" justify="space-around">
          <Grid item sm={12} xs={12} style={{ textAlign: "center" }}>
            <br />
            <h1 style={styleH1}>Audit Story</h1>
            <p>
              Open source web app (MIT License) to publish documentation and
              books.
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
  }
}

export default Home;
