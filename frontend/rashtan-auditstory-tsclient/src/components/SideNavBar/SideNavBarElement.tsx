import React, { useState } from "react";
import { makeStyles, createStyles } from "@material-ui/core/styles";
import {
  ListItem,
  ListItemIcon,
  ListItemText,
  Collapse,
  List
} from "@material-ui/core";
import { ExpandLess, ExpandMore } from "@material-ui/icons";
import LocalLink from "../../lib/LocalLink";

const useStyles = makeStyles(theme =>
  createStyles({
    nested: {
      paddingLeft: theme.spacing(4)
    }
  })
);

export interface SideElement {
  to: string;
  icon: React.ReactElement;
  text: string;
  subItems?: SideElement[];
  className?: string;
}

const SideNavBarElement: React.FC<SideElement> = ({
  to,
  icon,
  text,
  subItems,
  className
}) => {
  const { nested } = useStyles();
  const [open, setOpen] = useState(false);

  return subItems ? (
    subItems.length === 0 ? (
      <></>
    ) : (
      <React.Fragment>
        <ListItem button onClick={() => setOpen(!open)}>
          <ListItemIcon>{icon}</ListItemIcon>
          <ListItemText primary={text} />
          {open ? <ExpandLess /> : <ExpandMore />}
        </ListItem>
        <Collapse in={open} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            {subItems.map(s => (
              <SideNavBarElement {...s} key={s.text} className={nested} />
            ))}
          </List>
        </Collapse>
      </React.Fragment>
    )
  ) : (
    <LocalLink to={to} underline="none" color="textPrimary">
      <ListItem button className={className}>
        <ListItemIcon>{icon}</ListItemIcon>
        <ListItemText primary={text} />
      </ListItem>
    </LocalLink>
  );
};

export default SideNavBarElement;
