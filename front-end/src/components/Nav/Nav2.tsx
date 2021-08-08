import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import { Link } from "react-router-dom";
import { useAuth } from "../../firebase/index";
import logo from "../../Image/trekker.svg";
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import ListAltIcon from '@material-ui/icons/ListAlt';
import PersonIcon from '@material-ui/icons/Person';
import PersonAddIcon from '@material-ui/icons/PersonAdd';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    display: "flex",
    alignItems: "center",
    
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
    textDecoration: "none",
    color: "white",
    marginRight: theme.spacing(2),
  },
  link1: {
    textDecoration: "none",
    color: "white",
    marginRight: theme.spacing(2),
  },
  linkDecoration: {
    textDecoration: "none",
    color: "white",
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

          {auth.user?.email === "trekkerhenry@gmail.com"?<Link to="/admin" className={classes.linkDecoration}>
            <Button
              variant="contained"
              color="secondary"
              className={classes.link1}
            >
              Panel Administration
            </Button>
          </Link>: false}

          <Link to="/categories" className={classes.linkDecoration}>
            <Button
              variant="contained"
              color="secondary"
              className={classes.link1}
            >
              {/* < ListAltIcon style={{marginRight:"2px"}}/> */}
              Catalogue
            </Button>
          </Link>

          {auth.user ? (
            <Grid>
              
              <Link to="/User" className={classes.linkDecoration}>
                <Button
                  variant="contained"
                  color="secondary"
                  className={classes.link1}
                  
                >
                  {/* <PersonIcon style={{marginRight:"2px"}}/> */}
                  My Profile
                </Button>
              </Link>
              <Button
                className={classes.link1}
                variant="contained"
                color="secondary"
                onClick={() => auth.signout()}
              >
                {/* <ExitToAppIcon style={{marginRight:"2px"}} /> */}
                 Sign Out
              </Button>
            </Grid>
          ) : (
            <Link to="/register" className={classes.linkDecoration}>
              <Button variant="contained" color="secondary" className={classes.link1}>
                {/* <PersonAddIcon style={{marginRight:"3px"}}/> */}
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
