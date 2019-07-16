import React from "react";
import LocalLink from "../../lib/LocalLink";
import { ListItem, ListItemIcon, ListItemText } from "@material-ui/core";

export interface SideElement {
  to: string;
  icon: React.ReactElement;
  text: string;
}

const SideNavBarElement: React.FC<SideElement> = ({ to, icon, text }) => (
  <LocalLink to={to} underline="none" color="textPrimary">
    <ListItem button>
      <ListItemIcon>{icon}</ListItemIcon>
      <ListItemText primary={text} />
    </ListItem>
  </LocalLink>
);

export default SideNavBarElement;
