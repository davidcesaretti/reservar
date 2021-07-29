import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";
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
  },
}));

export default function PagoAppBar() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            <Link to="/" className={classes.link}>
              <img
                src={logo}
                alt="trekker logo"
                width="150"
                height="60"
                style={{ margin: "0" }}
              />
            </Link>
          </Typography>
          <Link to="/" className={classes.link1}>
            <Button variant="contained" color="secondary">
              Home
            </Button>
          </Link>
        </Toolbar>
      </AppBar>
    </div>
  );
}
