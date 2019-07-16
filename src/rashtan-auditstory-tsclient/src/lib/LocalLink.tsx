import React from "react";
import { Link as RouterLink } from "react-router-dom";
import { Link } from "@material-ui/core";

interface Props {
  to: string;
  children: React.ReactNode | string;
  underline?: "none" | "hover" | "always";
  color?:
    | "initial"
    | "inherit"
    | "primary"
    | "secondary"
    | "textPrimary"
    | "textSecondary"
    | "error";
}

const LocalLink: React.FC<Props> = ({ to, children, underline, color }) => (
  <Link to={to} component={RouterLink} underline={underline} color={color}>
    {children}
  </Link>
);

export default LocalLink;
