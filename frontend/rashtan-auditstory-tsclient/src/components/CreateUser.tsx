import React, { useState, useEffect } from "react";
import { History } from "history";
import { Button, Grid, Typography, Container } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Formik, Field, Form, FormikActions } from "formik";
import { TextField } from "formik-material-ui";
import { UserInfo } from "../models/UserInfo";
import { UserStatus } from "../models/IUserProfile";
import ApiService from "../services/ApiService";

const useStyles = makeStyles(theme => ({
  heroContent: {
    padding: theme.spacing(8, 0, 6)
  },
  buttons: {
    display: "flex",
    justifyContent: "flex-end"
  },
  button: {
    marginTop: theme.spacing(3),
    marginLeft: theme.spacing(1)
  }
}));

interface Props {
  apiService: ApiService;
  history: History;
}

const CreateUser: React.FC<Props> = ({ apiService, history }) => {
  const classes = useStyles();

  const [loaded, setLoaded] = useState(false);
  useEffect(() => {
    apiService.getUserStatus().then(c => {
      if (c === UserStatus.New) {
        setLoaded(true);
      } else {
        history.push("/portal");
      }
    });
  }, [apiService, history]);

  return loaded ? (
    <Formik
      initialValues={{
        name: "",
        city: "",
        state: "",
        country: ""
      }}
      onSubmit={(
        values: UserInfo,
        { setSubmitting }: FormikActions<UserInfo>
      ) => {
        apiService.startFreeTrial(values).then(_ => {
          setSubmitting(false);
          history.push("/portal");
        });
      }}
      render={({ isSubmitting }) => (
        <Form>
          <Container
            maxWidth="sm"
            component="main"
            className={classes.heroContent}
          >
            <Typography variant="h6" gutterBottom>
              User info
            </Typography>
          </Container>

          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <Field
                required
                name="name"
                label="Name (or nickname)"
                component={TextField}
                fullWidth
                autoComplete="fname"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Field
                name="city"
                label="City"
                component={TextField}
                fullWidth
                autoComplete="billing address-level2"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Field
                name="state"
                label="State/Province/Region"
                component={TextField}
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Field
                required
                name="country"
                label="Country"
                component={TextField}
                fullWidth
                autoComplete="billing country"
              />
            </Grid>
            <Button
              disabled={isSubmitting}
              type="submit"
              className={classes.button}
            >
              Start free trial
            </Button>
          </Grid>
        </Form>
      )}
    ></Formik>
  ) : (
    <></>
  );
};

export default CreateUser;
