import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import Grid from "@material-ui/core/Grid";
import { Link } from "react-router-dom";
import { useAuth } from "../../firebase/index";
import logo from "../../Image/trekker.svg";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginTop: theme.spacing(2),
    marginRight: theme.spacing(2),
  },
  title: {
    marginTop: theme.spacing(2),
    flexGrow: 1,
  },
  link: {
    marginTop: theme.spacing(2),
    textDecoration: "none",
    color: "white",
    marginRight: theme.spacing(2),
  },
  link1: {
    marginTop: theme.spacing(2),
    textDecoration: "none",
    color: "white",
    marginRight: theme.spacing(2),
  },
  linkDecoration: {
    textDecoration: "none",
  },
}));

export default function MenuAppBar() {
  const auth = useAuth();
  const classes = useStyles();

  useEffect(() => {}, [auth.user]);

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            <Link to="/" className={classes.link}>
              <img src={logo} alt="logo" width="150px" height="60px" />
            </Link>
          </Typography>

          <Link to="/categories" className={classes.linkDecoration}>
            <Button
              variant="contained"
              color="secondary"
              className={classes.link1}
            >
              Catalogue
            </Button>
          </Link>

          {auth.user ? (
            <Grid>
              <Button
                className={classes.link1}
                variant="contained"
                color="secondary"
                onClick={() => auth.signout()}
              >
                Sign Out
              </Button>
              <Link to="/User" className={classes.linkDecoration}>
                <Button
                  variant="contained"
                  color="secondary"
                  className={classes.link1}
                >
                  My Profile
                </Button>
              </Link>
            </Grid>
          ) : (
            <Link to="/register" className={classes.link1}>
              <Button variant="contained" color="secondary">
                Log In/Register
              </Button>
            </Link>
          )}
        </Toolbar>
      </AppBar>
    </div>
  );
}

/* import logo from "../../Image/logo.jpeg";
<img src={`${logo}`} alt="logo" className={classes.img} />
import { useHistory } from "react-router-dom";
let history = useHistory(); */
