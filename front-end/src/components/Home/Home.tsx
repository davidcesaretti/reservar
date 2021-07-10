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

const useStyle = makeStyles({
  containerFilters: {
    backgroundSize: "cover",
    backgroundImage: `url(${Image1})`,
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
    textShadow: "-1px 0 black, 0 1px black, 1px 0 black, 0 -1px black",
    fontSize: "1.5em",
    fontWeight: "bold",
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
              EXPLORA LOS ANDES !!!
            </Typography>
          </Grid>
          <FormControl>
            <FormLabel
              style={{
                display: "flex",
                border: "solid",
                backgroundColor: "whitesmoke",
                padding: "0.1rem 0.8rem",
                borderRadius: "1em",
              }}
            >
              <TextField
                id=""
                label="¿A Donde quieres ir?"
                variant="standard"
                color="secondary"
                margin="none"
                size="small"
              />
              <TextField
                id=""
                label="Fecha de llegada"
                variant="standard"
                color="primary"
                margin="none"
                size="small"
              />
              <TextField
                id=""
                label="Fecha de salida"
                variant="standard"
                color="primary"
                margin="none"
                size="small"
              />
              <TextField
                id=""
                label="¿Cuántos viajan?"
                variant="standard"
                color="primary"
                margin="none"
                size="small"
              />
              <SearchIcon
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  height: "auto",
                }}
              />
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
            <Typography variant="h6">Recomendados</Typography>
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
            <Typography variant="h6">
              EXPLORA SEGUN EL TIPO DE ALOJAMIENTO QUE QUIERES DISFRUTAR
            </Typography>
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
                  Hostales & Bed & Breakfast
                </Typography>
              </Grid>
              <Grid item xs={3}>
                <Button variant="contained">Explorar</Button>
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
                  Casas y Apartamentos
                </Typography>
              </Grid>
              <Grid item xs={3}>
                <Button variant="contained">Explorar</Button>
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
                  Fuera de lo comun
                </Typography>
              </Grid>
              <Grid item xs={3}>
                <Button variant="contained">Explorar</Button>
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
          <Grid item xs={6}>
            <Typography variant="subtitle1" className={classes.fontHomePrimary}>
              Tienes un inmueble para alquilar? Regístrate como Host y empieza a
              recibir huéspedes
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Button variant="contained">Quiero set Host !</Button>
          </Grid>
        </Grid>

        <Grid container justifyContent="space-between">
          <Footer />
        </Grid>
      </Grid>
    </div>
  );
};

export default Home;
