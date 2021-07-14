import Footer from "../Footer/Footer";
import TextField from "@material-ui/core/TextField";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import React, { useEffect } from "react";
import { Box, Button, Grid } from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import { Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Image1 from "../../Image/pexels-pixabay-210017.jpeg";
import Recom1 from "../../Image/recom1.jpeg";
import Recom2 from "../../Image/recom2.jpeg";
import Recom3 from "../../Image/recom3.jpeg";
import Recom4 from "../../Image/recom4.jpeg";
import Tipos1 from "../../Image/tipos1.jpeg";
import Tipos2 from "../../Image/tipos2.jpeg";
import Tipos3 from "../../Image/tipos3.jpeg";
import Chica from "../../Image/chica.jpeg";
import { useDispatch } from "react-redux";
import { fetchCardsHotels } from "../../actions";
import { Calendary } from "../Calendary/Calendary";

const useStyle = makeStyles({
  containerFilters: {
    backgroundSize: "cover",
    backgroundImage: `linear-gradient( rgb(4 4 4 / 30%), rgb(0 0 0 / 30%)), url(${Image1})`,
    display: "grid",
    justifyContent: "center",
    backgroundPosition: "center center",
    width: "100%",
    height: "20rem",
    borderBottom: "1.5px solid #333",
  },
  containerRecomendados: {
    padding: "0.5rem 3rem",
    margin: "1.3rem 0",
  },
  containerTipos: {
    padding: "0.5rem 3rem",
    marginBottom: "1.3rem",
  },
  imgRecomendadas: {
    borderRadius: "1em",
    width: "100%",
    height: "100%",
    maxHeight: "8rem",
    maxWidth: "14rem",
    backgroundPosition: "center",
  },
  imgTiposAlojamiento: {
    borderRadius: "1em",
    maxHeight: "17rem",
    maxWidth: "20rem",
    backgroundPosition: "center",
    backgroundSize: "cover",
    padding: "5rem",
  },
  fontHomePrimary: {
    color: "white",
    textShadow: "3px 3px 2px black",
    fontSize: "1.6em",
    fontWeight: "bold",
  },
  fontHomeSecondary: {
    display: "flex",
    alignItems: "center",
  },
  hr: {
    color: "#333",
    width: "75%",
  },
});
//fetchCardsHotels(page, price, amenities, type, accommodates, score);
const Home = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchCardsHotels("1", "asc", "TV", "Apartment", 4, 0));
  }, []);

  const onClickHandler = () => {
    dispatch(
      fetchCardsHotels(
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined
      )
    );
  };

  const classes = useStyle();

  return (
    <div>
      <Grid container justifyContent="center" spacing={5}>
        <Grid
          container
          item
          xs={12}
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
                id=""
                label="Where are you going?"
                variant="standard"
                color="secondary"
                margin="none"
                size="small"
              />
              {/* <TextField
                id=""
                label="Check in"
                variant="standard"
                color="primary"
                margin="none"
                size="small"
              />
              <TextField
                id=""
                label="Check out"
                variant="standard"
                color="primary"
                margin="none"
                size="small"
              /> */}
              <Calendary />
              <TextField
                id=""
                label="Guests"
                variant="standard"
                color="primary"
                margin="none"
                size="small"
              />
              <Button
                variant="contained"
                color="secondary"
                size="small"
                href="/Categories"
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  height: "70%",
                  alignSelf: "center",
                  borderRadius: "1em",
                }}
                onClick={onClickHandler}
              >
                <SearchIcon />
              </Button>
            </FormLabel>
          </FormControl>
        </Grid>
        <Grid
          xs={12}
          alignItems="center"
          justifyContent="space-between"
          direction="row"
          container
          className={classes.containerRecomendados}
        >
          <Grid item xs={2} style={{ textAlign: "center" }}>
            <Typography variant="h6">EXPLORE</Typography>
          </Grid>
          <Grid item xs={2}>
            <img src={`${Recom1}`} alt="" className={classes.imgRecomendadas} />
          </Grid>
          <Grid item xs={2}>
            <img src={`${Recom2}`} alt="" className={classes.imgRecomendadas} />
          </Grid>
          <Grid item xs={2}>
            <img src={`${Recom3}`} alt="" className={classes.imgRecomendadas} />
          </Grid>
          <Grid item xs={2}>
            <img src={`${Recom4}`} alt="" className={classes.imgRecomendadas} />
          </Grid>
        </Grid>
        <hr className={classes.hr} />
        <Grid
          container
          item
          xs={12}
          justifyContent="center"
          className={classes.containerTipos}
        >
          <Grid
            item
            xs={12}
            style={{
              justifyContent: "center",
              alignItems: "center",
              display: "flex",
              padding: "1rem",
            }}
          >
            <Typography variant="h6">CHOOSE YOUR STYLE</Typography>
          </Grid>
          <Grid item xs={12} justifyContent="space-evenly" container>
            <Grid
              item
              xs={3}
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
                  Hostels & Bed & Breakfast
                </Typography>
              </Grid>
              <Grid item xs={3}>
                <Button variant="contained">Go</Button>
              </Grid>
            </Grid>
            <Grid
              item
              xs={3}
              container
              style={{ backgroundImage: `url(${Tipos2})` }}
              className={classes.imgTiposAlojamiento}
            >
              <Grid item xs={12}>
                <Typography
                  variant="subtitle1"
                  className={classes.fontHomePrimary}
                >
                  Houses and Apartments
                </Typography>
              </Grid>
              <Grid item xs={3}>
                <Button variant="contained">Go</Button>
              </Grid>
            </Grid>
            <Grid
              item
              xs={3}
              container
              style={{ backgroundImage: `url(${Tipos3})` }}
              className={classes.imgTiposAlojamiento}
            >
              <Grid item xs={12}>
                <Typography
                  variant="subtitle1"
                  className={classes.fontHomePrimary}
                >
                  Uniques
                </Typography>
              </Grid>
              <Grid item xs={3}>
                <Button variant="contained">Go</Button>
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
            <Button variant="contained">make me a Host !</Button>
          </Grid>
        </Grid>

        <Grid container justifyContent="center">
          <Footer />
        </Grid>
      </Grid>
    </div>
  );
};

export default Home;
