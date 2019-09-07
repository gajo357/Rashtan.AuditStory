import React from "react";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import { CompanyProfile } from "../../models/CompanyProfile";
import { History } from "history";

const useStyles = makeStyles(theme => ({
  card: {
    height: "100%",
    display: "flex",
    flexDirection: "column"
  },
  cardMedia: {
    paddingTop: "56.25%", // 16:9
    cursor: "pointer"
  },
  cardContent: {
    flexGrow: 1
  }
}));

interface Props {
  company: CompanyProfile;
  history: History;
}

const CompanyCard: React.FC<Props> = ({
  company: { ticker, name },
  history
}) => {
  const classes = useStyles();
  const editStory = () => {
    history.push(`/portal/story/${ticker}`);
  };

  return (
    <Grid item key={ticker} xs={12} sm={6} md={4}>
      <Card className={classes.card}>
        <CardMedia
          className={classes.cardMedia}
          image="https://source.unsplash.com/random"
          title={name}
          onClick={editStory}
        />
        <CardContent className={classes.cardContent}>
          <Typography gutterBottom variant="h5" component="h2">
            {name} ({ticker})
          </Typography>
          <Typography>
            This is a media card. You can use this section to describe the
            content.
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="small" color="primary" onClick={editStory}>
            Edit
          </Button>
        </CardActions>
      </Card>
    </Grid>
  );
};

export default CompanyCard;
