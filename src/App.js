import React, { useState, useEffect } from "react";
import "./App.css";
import Note from "./components/Note";
import Archive from "./components/Archive";
import FormsHome from "./components/FormsHome";
import { initializeDB } from "./managers/utils";

import AppBar from "@material-ui/core/AppBar";
import Drawer from "@material-ui/core/Drawer";
import Hidden from "@material-ui/core/Hidden";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import HomeIcon from "@material-ui/icons/Home";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import LibraryBooksIcon from "@material-ui/icons/LibraryBooks";
import SpeakerNotesIcon from "@material-ui/icons/SpeakerNotes";
import BarChartIcon from "@material-ui/icons/BarChart";
import InfoIcon from "@material-ui/icons/Info";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import PostAddIcon from "@material-ui/icons/PostAdd";
import AccessAlarmIcon from "@material-ui/icons/AccessAlarm";
import SettingsIcon from "@material-ui/icons/Settings";
import { BrowserRouter, Switch, Route, Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";

const drawerWidth = 200;
const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  drawer: {
    [theme.breakpoints.up("sm")]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  appBar: {
    marginLeft: drawerWidth,
    [theme.breakpoints.up("sm")]: {
      width: `calc(100% - ${drawerWidth}px)`,
    },
    backgroundColor: theme.palette.primary,
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up("sm")]: {
      display: "none",
    },
  },
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  drawerHeader: {
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: "flex-end",
  },
}));
export default function App(props) {
  const { container } = props;
  const classes = useStyles();

  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const links = [
    {
      text: "Editor",
      link: "/editor",
      icon: <PostAddIcon />,
      component: <Placeholder />,
      exact: false,
    },
    {
      text: "Archive",
      link: "/archive",
      icon: <LibraryBooksIcon />,
      component: <Archive />,
      exact: false,
    },
    {
      text: "Forms",
      link: "/forms",
      icon: <SpeakerNotesIcon />,
      component: <FormsHome />,
      exact: false,
    },
    {
      text: "Stats",
      link: "/stats",
      icon: <BarChartIcon />,
      component: <Placeholder />,
      exact: false,
    },
    {
      text: "Alarms",
      link: "/alarms",
      icon: <AccessAlarmIcon />,
      component: <Placeholder />,
      exact: false,
    },
    {
      text: "Home",
      link: "/",
      icon: <HomeIcon />,
      component: <Note />,
      exact: false,
    },
    {
      text: "About",
      link: "/about",
      icon: <InfoIcon />,
      component: <Placeholder />,
      exact: false,
    },
    {
      text: "Settings",
      link: "/settings",
      icon: <SettingsIcon />,
      component: <Placeholder />,
      exact: false,
    },
  ];

  const DrawerComponent = () => {
    return (
      <React.Fragment>
        <List>
          {links.map(({ text, link, icon }, index) => (
            <ListItem key={text} component={Link} to={link}>
              <ListItemIcon>{icon}</ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>
      </React.Fragment>
    );
  };

  return (
    <div className={classes.root}>
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            className={classes.menuButton}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap>
            Memories
          </Typography>
        </Toolbar>
      </AppBar>
      <BrowserRouter>
        <nav className={classes.drawer} aria-label="Sidebar">
          {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
          <Hidden smUp implementation="css">
            <Drawer
              container={container}
              variant="temporary"
              open={mobileOpen}
              onClose={handleDrawerToggle}
              classes={{
                paper: classes.drawerPaper,
              }}
              ModalProps={{
                keepMounted: true, // Better open performance on mobile.
              }}
            >
              <div className={classes.drawerHeader}>
                <IconButton
                  color="inherit"
                  aria-label="Drawer"
                  edge="end"
                  onClick={handleDrawerToggle}
                >
                  <ChevronLeftIcon />
                </IconButton>
              </div>
              <Divider />
              <DrawerComponent />
            </Drawer>
          </Hidden>
          <Hidden xsDown implementation="css">
            <Drawer
              classes={{
                paper: classes.drawerPaper,
              }}
              variant="permanent"
              open
            >
              <div className={classes.drawerHeader}>
                <IconButton>
                  <MenuIcon />
                </IconButton>
              </div>
              <Divider />
              <DrawerComponent />
            </Drawer>
          </Hidden>
        </nav>

        <main className={classes.content}>
          <div className={classes.toolbar} />

          <Switch>
            <Route path="/about" component={Placeholder} />
            <Route path="/archive" component={Archive} />
            <Route path="/forms" component={FormsHome} />
            <Route path="/stats" component={Placeholder} />
            <Route path="/editor/:key" component={Note} />
            <Route path="/editor/" component={Note} />
            <Route path="/alarms/" component={Placeholder} />
            <Route path="/settings/" component={Placeholder} />
            <Route exact path="/" component={Note} />
          </Switch>
        </main>
      </BrowserRouter>
    </div>
  );
}

function Placeholder() {
  return <h2>Hello, I'm a placeholder</h2>;
}
