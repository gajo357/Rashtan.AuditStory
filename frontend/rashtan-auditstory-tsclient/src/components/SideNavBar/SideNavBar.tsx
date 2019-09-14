import React, { useEffect } from "react";
import clsx from "clsx";
import {
  Drawer,
  IconButton,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import DashboardIcon from "@material-ui/icons/Dashboard";
import FolderIcon from "@material-ui/icons/Folder";
import FolderOpenIcon from "@material-ui/icons/FolderOpen";
import BarChartIcon from "@material-ui/icons/BarChart";
import AccountBoxIcon from "@material-ui/icons/AccountBox";
import PlaylistAddIcon from "@material-ui/icons/PlaylistAdd";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import { drawerWidth } from "../../lib/SharedStyles";
import SideNavBarElement, { SideElement } from "./SideNavBarElement";
import ApiService from "../../services/ApiService";

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

const mainElements: () => SideElement[] = () => {
  return [
    {
      to: "/portal/newstory",
      icon: <PlaylistAddIcon />,
      text: "New story"
    },
    {
      to: "/portal",
      icon: <DashboardIcon />,
      text: "Dashboard"
    },
    {
      to: "",
      icon: <FolderIcon />,
      text: "Folders",
      subItems: []
    },
    {
      to: "/portal/reports",
      icon: <BarChartIcon />,
      text: "Reports"
    },
    {
      to: "/portal/account",
      icon: <AccountBoxIcon />,
      text: "Account"
    }
  ];
};

interface Props {
  apiService: ApiService;
  logOut: () => void;
}

const SideNavBar: React.FC<Props> = ({ apiService, logOut }) => {
  const classes = useStyles();

  const [open, setOpen] = React.useState(true);
  const [elements, setElements] = React.useState(mainElements());

  useEffect(() => {
    apiService.getFolders().then(folders => {
      const e = mainElements();
      const folder = e.find(f => f.text === "Folders");
      if (folder) {
        folder.subItems = folders.map(f => ({
          to: `/portal/folder/${f.name}`,
          icon: <FolderOpenIcon />,
          text: f.name
        }));
        setElements(e);
      }
    });
  }, [apiService]);

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
            <>
              <p>Audit Story</p>
              <IconButton onClick={handleDrawerClose}>
                <ChevronLeftIcon />
              </IconButton>
            </>
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
            {elements.map(p => (
              <SideNavBarElement {...p} key={p.text} />
            ))}
            <ListItem button onClick={() => logOut()}>
              <ListItemIcon>
                <ExitToAppIcon />
              </ListItemIcon>
              <ListItemText primary="Log out" />
            </ListItem>
          </React.Fragment>
        </List>
      </Drawer>
    </React.Fragment>
  );
};

export default SideNavBar;
