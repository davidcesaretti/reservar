import React, { useEffect } from "react";
import Footer from "../Footer/Footer";
import TextField from "@material-ui/core/TextField";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import { Select } from "@material-ui/core";
import { InputLabel } from "@material-ui/core";
import { MenuItem } from "@material-ui/core";
import { Box, Button, Grid } from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import { Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Image1 from "../../Image/pexels-pixabay-210017.jpeg";
import Tipos1 from "../../Image/tipos1.jpeg";
import Tipos2 from "../../Image/tipos2.jpeg";
import Tipos3 from "../../Image/tipos3.jpeg";
import Chica from "../../Image/chica.jpeg";
import { useDispatch, useSelector } from "react-redux";
import {
  addFavourites,
  BotonesPaginado,
  detailHotel,
  FechasReserva,
  fetchCardsHotels,
  findPost,
  getFavos,
  getListOfCities,
} from "../../actions";
import { Calendary } from "../Calendary/Calendary";
import MenuAppBar from "../Nav/Nav2";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../firebase/index";
// import AutoComplete from "material-ui/AutoComplete";
import Autocomplete from "@material-ui/lab/Autocomplete";

const useStyles = makeStyles((theme) => ({
  containerGeneral: {},
  containerFilters: {
    backgroundSize: "cover",
    backgroundImage: `linear-gradient( rgb(4 4 4 / 30%), rgb(0 0 0 / 30%)), url(${Image1})`,
    display: "grid",
    justifyContent: "center",
    backgroundPosition: "center center",
    maxWidth: "1519px",
    height: "20rem",
    borderBottom: "1.5px solid #333",
  },
  containerRecomendados: {
    padding: "0.5rem 6.5rem",
    margin: "1.3rem 0",
  },
  explore: {
    paddingBottom: "1.25rem",
    color: "black",
    textShadow: "1.4px 1.4px 1px #B2B1B9",
    [theme.breakpoints.down("xs")]: {
      marginBottom: "5px",
    },
  },
  containerTipos: {
    padding: "0.5rem 3rem",
    marginBottom: "1.3rem",
    [theme.breakpoints.down("xs")]: {
      marginBottom: "0px",
    },
  },
  imgRecomendadas: {
    borderRadius: "1em",
    width: "100%",
    height: "100%",
    maxHeight: "8rem",
    maxWidth: "14rem",
    backgroundPosition: "center",
    [theme.breakpoints.down("xs")]: {
      padding: "5px",
    },
  },
  imgTiposAlojamiento: {
    borderRadius: "1em",
    maxHeight: "17rem",
    maxWidth: "20rem",
    backgroundPosition: "center",
    backgroundSize: "cover",
    padding: "5rem",
    [theme.breakpoints.down("xs")]: {
      marginBottom: "1.6875rem",
    },
  },
  fontHomePrimary: {
    color: "white",
    textShadow: "3px 3px 2px black",
    fontSize: "1.6em",
    fontWeight: "bold",
    marginBottom: "1rem",
    display: "flex",
    justifyContent: "center",
  },
  fontHomeSecondary: {
    display: "flex",
    alignItems: "center",
    [theme.breakpoints.down("xs")]: {
      fontSize: "14px",
    },
  },
  hr: {
    color: "#333",
    width: "75%",
    [theme.breakpoints.down("xs")]: {
      marginBottom: "1.25rem",
    },
  },
  btnGo: {
    display: "flex",
    justifyContent: "center",
  },
  form: {
    [theme.breakpoints.down("xs")]: {
      margin: "0 5px",
    },
  },
}));
//fetchCardsHotels(page, price, amenities, type, accommodates, score);
const Home = () => {
  const [cities, setCities] = useState(undefined);
  const [guest, setGuest] = useState(undefined);
  const [type, setType] = useState(undefined);
  const fechas: any = useSelector((state: any) => state.fechas);
  const post = useSelector((state: any) => state.postsHost);
  const listOfCities = useSelector((state: any) => state.listOfCities);

  const dispatch = useDispatch();
  const auth = useAuth();
  const email = auth?.user?.email;
  const cards = useSelector((state: any) => state.cardsHotel);

  let ciudades = [
    "porto",
    "new york",
    "istanbul",
    "rio de janeiro",
    "hong kong",
    "sydney",
    "barcelona",
  ];
  let cantGuests = ["1", "2", "3", "4", "5", "6", "7", "8", "9"];
  let random1 = Math.floor(Math.random() * 4);
  let page = Math.floor(Math.random() * 12);
  let ciudadRandom = ciudades[random1];

  useEffect(() => {
    dispatch(getListOfCities());
  }, []);

  useEffect(() => {
    dispatch(
      fetchCardsHotels(
        1,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        ciudadRandom,
        undefined
      )
    );
  }, []);

  // if (Array.isArray(cards)) {
  //   dispatch(
  //     fetchCardsHotels(
  //       page,
  //       undefined,
  //       undefined,
  //       undefined,
  //       undefined,
  //       10,
  //       ciudadRandom,
  //       undefined
  //     )
  //   );
  // }

  function busqueda() {
    dispatch(FechasReserva({ ...fechas, cities, guest }));
    dispatch(
      fetchCardsHotels(
        1,
        undefined,
        undefined,
        undefined,
        guest,
        undefined,
        cities === "" ? undefined : cities,
        fechas
      )
    );
    dispatch(
      BotonesPaginado({
        paginado: 1,
        price: "nada",
        amenities: "nada",
        type: "nada",
        guest: guest || "nada",
        score: "nada",
        cities: cities === "" ? "nada" : cities,
        fechas: { checkin: fechas.checkin, checkout: fechas.checkout },
      })
    );
  }
  const classes = useStyles();

  function chooseTypes(tipos) {
    dispatch(FechasReserva({ ...fechas, type: tipos }));
    dispatch(
      fetchCardsHotels(
        1,
        undefined,
        undefined,
        tipos,
        undefined,
        undefined,
        undefined,
        undefined
      )
    );
  }

  let properties = [];
  function exploreProperties() {
    if (cards?.posts) {
      let result = cards.posts.slice(0, 4);

      properties.push(result);
    }
  }
  exploreProperties();

  useEffect(() => {
    if (email) {
      dispatch(getFavos(email));
      dispatch(findPost({ email: email }));
    }
  }, [email]);

  return (
    <div>
      <MenuAppBar />
      <Grid
        container
        justifyContent="center"
        spacing={5}
        className={classes.containerGeneral}
      >
        <Grid
          container
          item
          xs={12}
          md={12}
          className={classes.containerFilters}
          justifyContent="center"
        >
          <Grid
            item
            xs={12}
            style={{
              justifyContent: "center",
              alignItems: "center",
              display: "flex",
            }}
          >
            <Typography
              variant="h5"
              className={classes.fontHomePrimary}
              style={{
                justifyContent: "center",
                alignItems: "center",
                display: "flex",
              }}
            >
              FIND YOUR PLACE!
            </Typography>
          </Grid>
          <FormControl className={classes.form}>
            <FormLabel
              style={{
                display: "flex",
                border: "solid",
                backgroundColor: "whitesmoke",
                padding: "0.5rem 0.8rem",
                borderRadius: "1em",
                alignItems: "center",
              }}
            >
              <Autocomplete
                id="ciudades"
                options={listOfCities}
                onChange={(event: any, newValue: any | null) => {
                  setCities(newValue);
                }}
                // getOptionLabel={(listOfCities) => listOfCities}
                style={{ width: 220 }}
                renderInput={(params: any) => (
                  <TextField
                    {...params}
                    label="Where are you going?"
                    variant="standard"
                  />
                )}
              />
              <Calendary />
              {/* <TextField
                onChange={(e) => setGuest(e.target.value)}
                id=""
                label="Guests"
                variant="standard"
                color="primary"
                margin="none"
                size="small"
                cantGuests
              /> */}

              <Autocomplete
                id="cantGuests"
                options={cantGuests}
                onChange={(event: any, newValue: any | null) => {
                  setGuest(newValue);
                }}
                style={{ width: 180, marginRight: 12 }}
                renderInput={(params: any) => (
                  <TextField {...params} label="Guests" variant="standard" />
                )}
              />
              <Link to={"/categories"}>
                <Button
                  variant="contained"
                  color="secondary"
                  size="small"
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    height: "70%",
                    alignSelf: "center",
                    borderRadius: "1em",
                  }}
                  onClick={() => busqueda()}
                >
                  <SearchIcon />
                </Button>
              </Link>
            </FormLabel>
          </FormControl>
        </Grid>
        <Grid
          md={12}
          alignItems="center"
          justifyContent="space-between"
          direction="row"
          container
          className={classes.containerRecomendados}
        >
          <Grid
            item
            xs={12}
            md={12}
            style={{ textAlign: "center" }}
            className={classes.explore}
          >
            <Typography variant="h6">RECOMMENDED</Typography>
          </Grid>
          {properties[0] &&
            properties[0].map((el, i) => (
              <Grid item xs={6} md={2} key={i}>
                <Link to={`/categories/${el._id}`}>
                  <img
                    src={`${el.image}`}
                    alt={`${el.name}`}
                    className={classes.imgRecomendadas}
                  />
                </Link>
              </Grid>
            ))}
        </Grid>
        <hr className={classes.hr} />
        <Grid
          container
          item
          md={12}
          justifyContent="center"
          className={classes.containerTipos}
        >
          <Grid
            item
            xs={12}
            md={12}
            style={{
              justifyContent: "center",
              alignItems: "center",
              display: "flex",
              paddingBottom: "1.4rem",
              color: "black",
              textShadow: "1.4px 1.4px 1px #B2B1B9",
            }}
          >
            <Typography variant="h6">CHOOSE YOUR STYLE</Typography>
          </Grid>
          <Grid item xs={12} md={12} justifyContent="space-evenly" container>
            <Grid
              item
              xs={12}
              md={3}
              container
              style={{ backgroundImage: `url(${Tipos1})` }}
              className={classes.imgTiposAlojamiento}
            >
              <Grid item xs={12}>
                <Typography
                  variant="subtitle1"
                  className={classes.fontHomePrimary}
                  style={{ boxSizing: "content-box" }}
                >
                  Hostels
                </Typography>
              </Grid>
              <Grid item xs={12} md={12} className={classes.btnGo}>
                <Link to={"/categories"} style={{ textDecoration: "none" }}>
                  <Button
                    variant="contained"
                    onClick={() => chooseTypes("Hostel")}
                  >
                    Go
                  </Button>
                </Link>
              </Grid>
            </Grid>
            <Grid
              item
              xs={12}
              md={3}
              container
              style={{ backgroundImage: `url(${Tipos2})` }}
              className={classes.imgTiposAlojamiento}
            >
              <Grid item xs={12}>
                <Typography
                  variant="subtitle1"
                  className={classes.fontHomePrimary}
                >
                  Apartments
                </Typography>
              </Grid>
              <Grid item xs={12} md={12} className={classes.btnGo}>
                <Link to={"/categories"} style={{ textDecoration: "none" }}>
                  <Button
                    variant="contained"
                    onClick={() => chooseTypes("Apartment")}
                  >
                    Go
                  </Button>
                </Link>
              </Grid>
            </Grid>
            <Grid
              item
              xs={12}
              md={3}
              container
              style={{ backgroundImage: `url(${Tipos3})` }}
              className={classes.imgTiposAlojamiento}
            >
              <Grid item xs={12}>
                <Typography
                  variant="subtitle1"
                  className={classes.fontHomePrimary}
                >
                  Houses
                </Typography>
              </Grid>
              <Grid item xs={12} md={12} className={classes.btnGo}>
                <Link to={"/categories"} style={{ textDecoration: "none" }}>
                  <Button
                    variant="contained"
                    onClick={() => chooseTypes("House")}
                  >
                    Go
                  </Button>
                </Link>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <hr className={classes.hr} />

        <Grid
          item
          xs={10}
          direction="column"
          container
          style={{
            backgroundImage: `url(${Chica})`,
            backgroundSize: "cover",
            height: "20rem ",
            backgroundPosition: "center",
            borderRadius: "1em",
            margin: "1.8rem",
          }}
        >
          <Grid item xs={6} className={classes.fontHomeSecondary}>
            <Typography variant="subtitle1" className={classes.fontHomePrimary}>
              Got a place? Share your space and earn an <br /> extra income!
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Link to="/User" style={{ textDecoration: "none" }}>
              <Button variant="contained">make me a Host !</Button>
            </Link>
          </Grid>
        </Grid>

        <Grid container justifyContent="center">
          <Footer />
        </Grid>
      </Grid>
    </div>
  );
  //};
};
export default Home;
