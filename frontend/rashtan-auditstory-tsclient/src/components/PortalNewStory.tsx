import React from "react";
import { History } from "history";
import ApiService from "../services/ApiService";
import { Formik, Field, Form, FormikActions } from "formik";
import { TextField } from "formik-material-ui";
import { CompanyProfile } from "../models/CompanyProfile";
import { Button, InputAdornment } from "@material-ui/core";

interface Props {
  apiService: ApiService;
  history: History;
}

const PortalNewStory: React.FC<Props> = ({ apiService, history }) => {
  return (
    <Formik
      initialValues={{
        name: "",
        ticker: "",
        stockExchange: "",
        numberOfShares: 0,
        marketCap: 0,
        folder: ""
      }}
      onSubmit={(
        values: CompanyProfile,
        { setSubmitting }: FormikActions<CompanyProfile>
      ) => {
        console.log(values);
        apiService
          .createNewStory(values)
          .then(c => {
            history.push(`/portal/story/${c}`);
          })
          .catch(e => {
            alert(JSON.stringify(e, null, 2));
            setSubmitting(false);
          });
      }}
      render={({ isSubmitting }) => (
        <Form>
          <Field
            name="name"
            label="Company name"
            component={TextField}
            required
          />
          <Field
            name="stockExchange"
            label="Stock Exchange"
            component={TextField}
            required
          />
          <Field name="ticker" label="Ticker" component={TextField} required />
          <Field
            name="numberOfShares"
            label="Number of shares outstanding"
            component={TextField}
            type="number"
          />
          <Field
            name="marketCap"
            label="Market cap"
            component={TextField}
            type="number"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">$</InputAdornment>
              )
            }}
          />
          <Button disabled={isSubmitting} type="submit">
            Create
          </Button>
        </Form>
      )}
    />
  );
};

export default PortalNewStory;
