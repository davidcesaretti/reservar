import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addFavourites, getFavos } from "../../actions";
import style from "./Favorites.module.css";
import { useAuth } from "../../firebase/index";
import CardComp from "../CardComp/CardComp";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import Container from "@material-ui/core/Container";
import { Box, Button, Grid, Typography } from "@material-ui/core";
import NavBar from "../Nav/Nav2";
import Error404 from "../Error404/Error404";
import Spinner from "../Spinner/Spinner";
import ErrorNoprop from "../Error404/Noprop";
import { useState } from "react";

const useStyles = makeStyles((theme) => ({
  container: {
    minHeight: "482px",
  },
  cardGrid: {
    paddingTop: theme.spacing(6),
    paddingBottom: theme.spacing(8),
  },
  card: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
  },
  title: {
    paddingTop: "1rem",
    marginTop: "1rem",
    color: "black",
    textShadow: "1.4px 1.4px 1px #B2B1B9",
    fontSize: "calc(2vw + 1em)",
  },
  noPublications: {
    fontSize: "2em",
    display: "flex",
    justifyContent: "center",
    alignContent: "center",
    margin: "0 auto",
    paddingTop: "50px",
    marginBottom: "257px",
    color: "#787A91",
  },
}));

const Favorites = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const auth = useAuth();
  const cards = useSelector((state: any) => state.userfavossss);

  let email = auth.user.email;

  let arrayfavs = [];

  useEffect(() => {
    cards.map((e) => arrayfavs.push(e._id));
  }, [cards]);

  const [fav, setFav]: any = useState({
    favos: [],
    email: email,
  });

  useEffect(() => {
    arrayfavs.map((e) => (!fav.favos.includes(e) ? fav.favos.push(e) : ""));
  }, [arrayfavs]);

  const handleClick = (e) => {
    e.preventDefault();
    console.log(e.currentTarget.value, "   VALUE PUSHEADO");

    if (fav?.favos?.includes(e.currentTarget.value)) {
      setFav({
        ...fav,
        favos: fav.favos.filter((x) => x !== e.currentTarget.value),
      });
      console.log("BORRANDOOOO");
    } else {
      setFav({ ...fav, favos: fav.favos.concat(e.currentTarget.value) });
    }

    console.log(fav, "  FAV");
  };

  useEffect(() => {
    dispatch(addFavourites(fav));
  }, [fav]);

  useEffect(() => {
    setTimeout(() => {
      dispatch(getFavos(email));
    }, 3000);
  }, [fav]);

  // if (cards.length === 0) {
  //   return <ErrorNoprop />;
  // } else if (cards.length < 1) {
  //   return <Spinner />;
  // } else {
  return (
    <div className={classes.container}>
      <Grid>
        <Typography className={classes.title} variant="h4" align="center">
          Favourite properties
        </Typography>
      </Grid>
      <Container className={classes.cardGrid} maxWidth="md">
        {/* End hero unit */}
        <Grid container spacing={4}>
          {cards.length === 0 ? (
            <div className={classes.noPublications}>
              You don't have favourites properties
            </div>
          ) : (
            cards.map((e, i) => (
              <Grid item key={e} xs={12} sm={6} md={6}>
                <Card className={classes.card}>
                  <CardComp
                    key={i}
                    _id={e._id}
                    image={e.image}
                    score={e.score}
                    name={e.name}
                    type={e.type}
                    address={e.address}
                    accommodates={e.accommodates}
                    beds={e.beds}
                    price={e.price}
                    click={handleClick}
                    boton={false}
                    deleteButton={false}
                  />
                </Card>
              </Grid>
            ))
          )}
        </Grid>
      </Container>
    </div>
  );
};
export default Favorites;
