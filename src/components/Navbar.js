import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import AccountCircle from "@material-ui/icons/AccountCircle";
import { useAuth } from "../contexts/AuthContext";
import { Link, useHistory } from "react-router-dom";
import logo from "../assets/logo.png";

const useStyles = makeStyles((theme) => ({
  toolBar: {
    display: "flex",
    justifyContent: "space-between",
  },

  title: {
    fontFamily: "Girassol",
    display: "none",
    //responsive designing
    [theme.breakpoints.up("sm")]: {
      display: "block",
    },
    "& span": {
      fontSize: 40,
      color: "white",
      textAlign: "center",
      letterSpacing: 12,
    },
  },

  login: {
    padding: 10,
    fontSize: 20,
    color: "white",
    textDecoration: "none",
  },
  register: {
    fontSize: 20,
    padding: 10,
    color: "white",
    textDecoration: "none",
  },
  logo: {
    width: 50,
    height: 50,
  },
  appBar: {
    backgroundColor: "#add8e6",
  },
  linkStyle: {
    textDecoration: "none",
    color: "black",
  },
}));

export default function PrimarySearchAppBar() {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null); // Icon Menu
  const { currentUser, logout } = useAuth();
  const history = useHistory();

  const isMenuOpen = Boolean(anchorEl);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    handleMenuClose();
    logout();
  };

  const handleDashboard = () => {
    history.push("/");
  };

  const renderMenu = (
    <>
      {/* Show Profile, New Blog and Logout if user is logged in, Login and Register if not */}
      {currentUser?.email ? (
        <Menu
          anchorEl={anchorEl}
          anchorOrigin={{ vertical: "top", horizontal: "right" }}
          keepMounted
          transformOrigin={{ vertical: "top", horizontal: "right" }}
          open={isMenuOpen}
          onClose={handleMenuClose}
          style={{ marginTop: "2rem", marginLeft: "1rem" }}
        >
          <Link to="/profile" className={classes.linkStyle}>
            <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
          </Link>
          <Link to="/new-blog" className={classes.linkStyle}>
            <MenuItem onClick={handleMenuClose}>New Blog</MenuItem>
          </Link>
          <MenuItem onClick={handleLogout}>Logout</MenuItem>
        </Menu>
      ) : (
        <Menu
          anchorEl={anchorEl}
          anchorOrigin={{ vertical: "top", horizontal: "right" }}
          keepMounted
          transformOrigin={{ vertical: "top", horizontal: "right" }}
          open={isMenuOpen}
          onClose={handleMenuClose}
          style={{ marginTop: "2rem", marginLeft: "1.25rem" }}
        >
          <Link to="/login" className={classes.linkStyle}>
            <MenuItem onClick={handleMenuClose}>Login</MenuItem>
          </Link>
          <Link to="/register" className={classes.linkStyle}>
            <MenuItem onClick={handleMenuClose}>Register</MenuItem>
          </Link>
        </Menu>
      )}
    </>
  );

  return (
    <div>
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar className={classes.toolBar}>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="open drawer"
            onClick={handleDashboard}
          >
            <img src={logo} alt="logo" className={classes.logo} />
          </IconButton>

          <Link to="/" className={classes.login}>
            <Typography className={classes.title} variant="h6" noWrap>
              <span>Kinaxis Projects</span>
            </Typography>
          </Link>

          <div>
            <IconButton
              edge="end"
              aria-label="account of current user"
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>

      {renderMenu}
    </div>
  );
}
