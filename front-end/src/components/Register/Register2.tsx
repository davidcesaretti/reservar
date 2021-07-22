import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import firebase from "firebase";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";
import { storage } from "../../firebase/index";
import { Button, Container, Typography, Grid } from "@material-ui/core";
import { signUser, UserEmail, UserEmailGlobal, getUserInfo } from "../../actions/index";
import { makeStyles } from "@material-ui/core/styles";
import backImg from "../../Image/fondoLogin.jpeg";
import "@fontsource/roboto";
import { useAuth } from "../../firebase/index";

const useStyle = makeStyles((theme) => ({
  login: {
    background: "rgba(71, 84, 55, 0.9)",
    height: "26em",
    textAlign: "center",
    padding: "1em",
    width: "35em",
    marginTop: "3em",
  },
  buttonsLogin: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  navBar: {
    position: "relative",
    height: "4em",
    background: "rgba(48, 58, 31, 0.85)",
  },
  ctn: {
    position: "absolute",
    top: "0",
    bottom: "0",
    left: "0",
    right: "0",
    backgroundSize: "cover",
    backgroundImage: `url(${backImg})`,
  },
  footer: {
    height: "1.5em",
    background: "rgba(48, 58, 31, 0.85)",
    position: "absolute",
    bottom: "0",
    left: "0",
    right: "0",
    textAlign: "center",
    padding: "1.5em",
  },
  title1: {
    color: "#FFF",
    fontSize: "1.4em",
    fontWeight: "bolder",
    marginBottom: "1.5em",
    marginTop: "0.5em",
  },
  title2: {
    color: "#FFF",
    fontSize: "1.3em",
    marginBottom: theme.spacing(2),
  },
  infoFooter: {
    color: "#FFF",
    fontSize: "1.2em",
  },
  homeButton: {
    position: "absolute",
    right: "0.7em",
    top: "0.7em",
  },
  link: {
    color: "#FFF",
    textDecoration: "none",
  },
  link1: {
    color: "white",
    textDecoration: "none",
  },
  completediv: {
    marginTop: theme.spacing(2),
  },
  buttonOut: {
    marginBottom: theme.spacing(1),
  },
}));
const Register = () => {
  const auth = useAuth();
  const user = auth.user;
  /* if (!firebase.apps.length) {
    firebase.initializeApp({
      apiKey: "AIzaSyBh2wY42foyI4uwoW9wfIKtCz2ie-mXELw",
      authDomain: "reservar-319305.firebaseapp.com",
    });
  } else {
    firebase.app();
  } */

  const [signedIn, setSignedIn] = useState(false);

  const [logged, setLogged] = useState(false);
  const dispatch = useDispatch();
  /*let signed = useSelector((state: any) => state.signed);
    console.log('hol '+ signed) */

  const uiConfig = {
    signInFlow: "popup",
    signInOptions: [
      firebase.auth.GoogleAuthProvider.PROVIDER_ID,
      firebase.auth.FacebookAuthProvider.PROVIDER_ID,
      firebase.auth.EmailAuthProvider.PROVIDER_ID,
    ],/* 
    callbacks: {handleSign: () => console.log('hola')}, */
  };

  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      setSignedIn(!!user);
    });
  }, [dispatch]);

  /* firebase.auth().currentUser && setLogged(true)
    logged && setUserInfo(firebase.auth().currentUser)
    logged && dispatch(signUser(userInfo))
    setLogged(false) */
  let userlogged = firebase.auth().currentUser;

  const [userInfo, setUserInfo] = useState({
    name: "",
    email: "",
    photo: "",
  });

  useEffect(() => {
    setUserInfo({
      ...userInfo,
      name: userlogged?.displayName,
      email: userlogged?.email,
      photo: userlogged?.photoURL,
    });
  }, [userlogged]);

  useEffect(() => {
    if (userInfo?.email?.length > 2) {
      dispatch(signUser(userInfo));
      console.log("despachando", userInfo);
    }
  }, [userInfo]);

  /* console.log(firebase.auth().currentUser) */

  const handleClick = () => {
    firebase.auth().signOut();
    setLogged(false);
    dispatch(UserEmailGlobal(""));
  };

  let email = auth?.user?.email

  const handleSign = () => {
    console.log('handlesign')
    dispatch(getUserInfo(email))
  }

  const classes = useStyle();
  return (
    <Grid className={classes.ctn}>
      <Grid xs={12} className={classes.navBar}>
        <Button
          className={classes.homeButton}
          color="secondary"
          variant="contained"
          size="large"
        >
          <Link to="/" className={classes.link}>
            Home
          </Link>
        </Button>
      </Grid>
      <Container className={classes.login}>
        <Typography className={classes.title1}>
          We welcome you to Trekker!
        </Typography>

        <Container maxWidth="xs" className={classes.buttonsLogin}>
          {user ? (
            <Grid>
              <Button
                onClick={() => {
                  handleClick();
                }}
                color="secondary"
                variant="contained"
                className={classes.buttonOut}
              >
                Sign Out
              </Button>
              <Typography className={classes.title2}>
                Hello, {firebase.auth().currentUser.displayName}
              </Typography>
              <img src={firebase.auth().currentUser.photoURL} alt="user" />
              <div className={classes.completediv}>
                <Link to="/User" className={classes.link1}>
                  <Button onClick={() => {handleSign()}} variant="contained" color="secondary">
                    Go to your Profile!
                  </Button>
                </Link>
              </div>
            </Grid>
          ) : (
            <Grid>
              <Typography className={classes.title2}>
                Login or Register
              </Typography>
              <StyledFirebaseAuth
                
                uiConfig={uiConfig}
                firebaseAuth={firebase.auth()}
              />
            </Grid>
          )}
        </Container>
      </Container>
      <Grid xs={12} className={classes.footer}>
        <Typography className={classes.infoFooter}>Copyright 2021</Typography>
      </Grid>
    </Grid>
  );
};

export default Register;
