import React from "react";
import clsx from "clsx";
import { Drawer, IconButton, Divider, List } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import DashboardIcon from "@material-ui/icons/Dashboard";
import FolderIcon from "@material-ui/icons/Folder";
import BarChartIcon from "@material-ui/icons/BarChart";
import AccountBoxIcon from "@material-ui/icons/AccountBox";
import PlaylistAddIcon from "@material-ui/icons/PlaylistAdd";
import { drawerWidth } from "../../lib/SharedStyles";
import SideNavBarElement, { SideElement } from "./SideNavBarElement";

const useStyles = makeStyles(theme => ({
  toolbarIcon: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: "0 8px",
    ...theme.mixins.toolbar
  },
  drawerPaper: {
    position: "relative",
    whiteSpace: "nowrap",
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  drawerPaperClose: {
    overflowX: "hidden",
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    width: theme.spacing(7),
    [theme.breakpoints.up("sm")]: {
      width: theme.spacing(9)
    }
  }
}));

const mainElements: SideElement[] = [
  {
    to: "/",
    icon: <PlaylistAddIcon />
  },
  {
    to: "/portal",
    icon: <DashboardIcon />,
    text: "Dashboard"
  },
  {
    to: "/portal",
    icon: <FolderIcon />,
    text: "Folders"
  },
  {
    to: "/portal",
    icon: <BarChartIcon />,
    text: "Reports"
  },
  {
    to: "/portal",
    icon: <AccountBoxIcon />,
    text: "Account"
  }
];

const SideNavBar: React.FC = () => {
  const classes = useStyles();

  const [open, setOpen] = React.useState(true);
  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <React.Fragment>
      <Drawer
        variant="permanent"
        classes={{
          paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose)
        }}
        open={open}
      >
        <div className={classes.toolbarIcon}>
          {open && (
            <IconButton onClick={handleDrawerClose}>
              <ChevronLeftIcon />
            </IconButton>
          )}
          {!open && (
            <IconButton onClick={handleDrawerOpen}>
              <ChevronRightIcon />
            </IconButton>
          )}
        </div>

        <Divider />

        <List>
          <React.Fragment>
            {mainElements.map(p => (
              <SideNavBarElement {...p} />
            ))}
          </React.Fragment>
        </List>
      </Drawer>
    </React.Fragment>
  );
};

export default SideNavBar;
