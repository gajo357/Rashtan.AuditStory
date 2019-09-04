import React from "react";
import {
  Button,
  Grid,
  Typography,
  TextField,
  Container
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { UserInfo } from "../../models/UserInfo";

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
  saveUserInfo: (u: UserInfo) => void;
  skip: () => void;
}

const AddressForm: React.FC<Props> = ({ saveUserInfo, skip }) => {
  const classes = useStyles();
  const [user, setUser] = React.useState<UserInfo>({
    firstName: "",
    lastName: "",
    city: "",
    state: "",
    country: ""
  });

  const handleSave = () => {
    saveUserInfo(user);
  };

  return (
    <React.Fragment>
      <Container maxWidth="sm" component="main" className={classes.heroContent}>
        <Typography variant="h6" gutterBottom>
          User info
        </Typography>
        <Typography
          variant="h5"
          align="center"
          color="textSecondary"
          component="p"
        >
          We actually do not need this data, so you can simply skip this step.
        </Typography>
      </Container>

      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="firstName"
            name="firstName"
            label="First name"
            fullWidth
            autoComplete="fname"
            value={user.firstName}
            onChange={e => setUser({ ...user, firstName: e.target.value })}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="lastName"
            name="lastName"
            label="Last name"
            fullWidth
            autoComplete="lname"
            value={user.lastName}
            onChange={e => setUser({ ...user, lastName: e.target.value })}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="city"
            name="city"
            label="City"
            fullWidth
            autoComplete="billing address-level2"
            value={user.city}
            onChange={e => setUser({ ...user, city: e.target.value })}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            id="state"
            name="state"
            label="State/Province/Region"
            fullWidth
            value={user.state}
            onChange={e => setUser({ ...user, state: e.target.value })}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="country"
            name="country"
            label="Country"
            fullWidth
            autoComplete="billing country"
            value={user.country}
            onChange={e => setUser({ ...user, country: e.target.value })}
          />
        </Grid>
        <div className={classes.buttons}>
          <Button onClick={skip} className={classes.button}>
            Skip
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={handleSave}
            className={classes.button}
          >
            Save
          </Button>
        </div>
      </Grid>
    </React.Fragment>
  );
};

export default AddressForm;
