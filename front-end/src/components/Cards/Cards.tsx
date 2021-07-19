import React, { useEffect } from "react";
import AppBar from "@material-ui/core/AppBar";
import CameraIcon from "@material-ui/icons/PhotoCamera";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import CssBaseline from "@material-ui/core/CssBaseline";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import CardComp from "../CardComp/CardComp";
import Footer from "../Footer/Footer";
import CheckboxList from "../Filters/Filters";
import { useDispatch, useSelector } from "react-redux";
import {
  addFavourites,
  FechasReserva,
  fetchCardsHotels,
  getFavos,
} from "../../actions";
import { hotelsReducer } from "../../reducers/hotels";
import NavBar from "../Nav/Nav2";
import { truncate } from "fs";
import Alert from "@material-ui/lab/Alert";
import { FlashMessage } from "./flashmsg";
import IconButton from "@material-ui/core/IconButton";
import FavoriteIcon from "@material-ui/icons/Favorite";
import Calendary from "../Calendary/Calendary";
import MenuAppBar from "../Nav/Nav2";
import { useState } from "react";
import TextField from "@material-ui/core/TextField";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import { Box, Button, Grid } from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import { Link } from "react-router-dom";
import { useAuth } from "../../firebase/index";

const useStyles = makeStyles((theme) => ({
  icon: {
    marginRight: theme.spacing(2),
  },
  heroContent: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(8, 0, 6),
  },
  heroButtons: {
    marginTop: theme.spacing(4),
  },
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
  },
  card: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
  },
  cardMedia: {
    paddingTop: "56.25%", // 16:9
  },
  cardContent: {
    flexGrow: 1,
  },
  footer: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(6),
  },
  navbar: {
    height: "80%",
  },
  iconfav: {
    color: "black",
    padding: "5px",
    background: "#8b96c175",
    fontSize: "1.2rem",
  },
  iconfavclicked: {
    color: "red",
    padding: "5px",
    background: "#8b96c175",
    fontSize: "1.2rem",
  },
}));

export default function Album() {
  const classes = useStyles();
  const cards = useSelector((state: any) => state.cardsHotel);
  const auth = useAuth();
  const dispatch = useDispatch();
  const userfavs = useSelector((state: any) => state.userfavossss);
  const [cities, setCities] = useState(undefined);
  const [guest, setGuest] = useState(undefined);
  const email = auth?.user?.email;
  const fechas = useSelector((state: any) => state.fechas);
  function busqueda() {
    dispatch(FechasReserva({ ...fechas, cities, guest }));
    console.log("Dispatch busqueda");
    dispatch(
      fetchCardsHotels(
        undefined,
        undefined,
        undefined,
        undefined,
        guest,
        undefined,
        cities,
        fechas
      )
    );
  }

  const [fav, setFav]: any = useState({
    favos: [],
    email: email,
  });
  const [success, setSuccess] = useState(false);
  const [message, setMessage] = useState("");

  const resetState = () => {
    setSuccess(false);
    setMessage("");
  };
  useEffect(() => {
    dispatch(getFavos(email));
  }, [fav]);

  const handleClick = (e) => {
    e.preventDefault();
    if (fav?.favos?.includes(e.currentTarget.value)) {
      setFav({
        ...fav,
        favos: fav.favos.filter((x) => x !== e.currentTarget.value),
      });

      setMessage("error");
      setSuccess(true);

      setTimeout(resetState, 3000);
    } else {
      setFav({ ...fav, favos: fav.favos.concat(e.currentTarget.value) });

      setMessage("success");
      setSuccess(true);
      setTimeout(resetState, 3000);
    }
  };
  useEffect(() => {
    dispatch(addFavourites(fav));
    console.log(fav, "    DISPATCH FAVOS");
  }, [fav]);

  let arrayfavs = [];

  useEffect(() => {
    userfavs.map((e) => arrayfavs.push(e._id));
  }, [userfavs]);

  return (
    <React.Fragment>
      <CssBaseline />
      <NavBar />
      <CheckboxList />
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          paddingTop: "16px",
          paddingBottom: "0",
        }}
      >
        <FormControl>
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
            <TextField
              onChange={(e) => setCities(e.target.value)}
              id=""
              label="Where are you going?"
              variant="standard"
              color="secondary"
              margin="none"
              size="small"
            />
            <Calendary />
            <TextField
              onChange={(e) => setGuest(e.target.value)}
              id=""
              label="Guests"
              variant="standard"
              color="primary"
              margin="none"
              size="small"
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
      </div>
      {/* fksjahfjkashfkjashfasfrjkasfhapsfhlasfhlkasfhlkashflksflashflkasfhlkashlkashflkfa */}
      <main style={{ marginLeft: "200px" }}>
        {/* Hero unit */}
        <Container className={classes.cardGrid} maxWidth="md">
          {/* End hero unit */}
          <Grid container spacing={4}>
            {cards.posts &&
              cards.posts.map((e) => (
                <Grid item key={e} xs={12} sm={6} md={6}>
                  <Card className={classes.card}>
                    <CardComp
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
                    />
                  </Card>
                  <IconButton
                    aria-label="add to favorites"
                    className={
                      arrayfavs.includes(e._id)
                        ? classes.iconfavclicked
                        : classes.iconfav
                    }
                  >
                    <FavoriteIcon />
                  </IconButton>
                </Grid>
              ))}
          </Grid>
        </Container>
      </main>
      {/* Footer */}
      <div style={{ marginLeft: "200px", width: "80%" }}>
        <Footer />
        {/* End footer */}
      </div>
      {success ? <FlashMessage message={message} /> : ""}
    </React.Fragment>
  );
}
