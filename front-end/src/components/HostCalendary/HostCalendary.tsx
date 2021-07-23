import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";
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

export default function HostCalendary() {
  const classes = useStyles();

  return (
    <div>
      Host calendary
    </div>
  );
}