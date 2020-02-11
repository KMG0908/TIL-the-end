import React from "react";
import clsx from "clsx";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import CssBaseline from "@material-ui/core/CssBaseline";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import Divider from "@material-ui/core/Divider";
import { fade } from "@material-ui/core/styles";

import { SidebarList, WithTitle } from "./SidebarList";
import storage from "lib/storage";

import { connect } from "react-redux";
import { logout } from "../../actions";

import AccountCircle from "@material-ui/icons/AccountCircle";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import { withRouter } from "react-router-dom";
import TitleBreadcumbs from "./TitleBreadcumbs";

import { Background } from "devextreme-react/vector-map";
import history from "../../history";
const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
    flexGrow: 1
  },
  appBar: {
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    })
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  hide: {
    display: "none"
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0
  },
  drawerPaper: {
    width: drawerWidth
  },
  drawerHeader: {
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
    justifyContent: "flex-end"
  },
  toolbar: {},
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    marginLeft: -drawerWidth
  },
  contentShift: {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen
    }),
    marginLeft: 0
  },
  menuRight: {
    float: "right"
  },
  title: { flexGrow: 1 }
}));

function Navigation(props) {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const logout = () => {
    storage.remove("loggedInfo");
    props.logout();
    history.push("/");
  };

  const handleMenu = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const myPage = () => {
    console.log("props");
    console.log(props);
    history.push("/mypage");
  };
  console.log(props.members.mem_info);

  const login = () => {
    history.push("/login");
  };
  const regist = () => {
    history.push("/register");
  };
  const mySetting = () => {
    history.push("/my-setting");
  };
  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        style={{
          backgroundColor: props.members.mem_info
            ? props.members.mem_info.mem_color
              ? props.members.mem_info.mem_color
              : "#94C9A9"
            : "#94C9A9"
        }}
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open
        })}
      >
        <Toolbar className={classes.toolbar}>
          {props.mem_info ? (
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerOpen}
              edge="start"
              className={clsx(classes.menuButton, open && classes.hide)}
            >
              <MenuIcon />
            </IconButton>
          ) : null}
          <Typography variant="h6" noWrap className={classes.title}>
            <TitleBreadcumbs />

            <WithTitle />
          </Typography>
          <div>
            <IconButton
              className={classes.menuRight}
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleMenu}
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right"
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right"
              }}
              open={anchorEl}
              onClose={handleClose}
            >
              {props.mem_info ? (
                <>
                  <MenuItem onClick={handleClose}>Profile</MenuItem>
                  <MenuItem onClick={myPage}>My Page</MenuItem>
                  <MenuItem onClick={mySetting}>My Setting</MenuItem>
                  <MenuItem onClick={logout}>Logout</MenuItem>
                </>
              ) : (
                <>
                  <MenuItem onClick={login}>Sign In</MenuItem>
                  <MenuItem onClick={regist}>Sign Up</MenuItem>
                </>
              )}
            </Menu>
          </div>
        </Toolbar>
      </AppBar>
      {props.mem_info ? (
        <>
          <Drawer
            className={classes.drawer}
            variant="persistent"
            anchor="left"
            open={open}
            classes={{
              paper: classes.drawerPaper
            }}
          >
            <div className={classes.drawerHeader}>
              {props.mem_info.mem_nick}님 환영합니다
              <IconButton onClick={handleDrawerClose}>
                {theme.direction === "ltr" ? (
                  <ChevronLeftIcon />
                ) : (
                  <ChevronRightIcon />
                )}
              </IconButton>
            </div>
            <Divider />

            <SidebarList user_id={props.mem_info.user_id} />
          </Drawer>
        </>
      ) : null}
      <main
        className={clsx(classes.content, {
          [classes.contentShift]: open
        })}
      >
        <div className={classes.drawerHeader} />
        {props.children}
      </main>
    </div>
  );
}

const mapStateToProps = state => {
  return {
    members: state.members
  };
};

export default connect(mapStateToProps, { logout })(withRouter(Navigation));
