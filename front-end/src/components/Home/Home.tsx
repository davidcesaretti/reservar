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
  boxFilters: {
    display: "flex",
    justifyContent: "center",
    borderRadius: 10,
  },
  containerFilters: {
    backgroundSize: "cover",
    backgroundImage: `url(${Image1})`,
    display: "grid",
    justifyContent: "center",
    backgroundPosition: "center",
  },
  containerRecomendados: {
    display: "grid",
    gridTemplateColumns: "5fr",
  },
  imgRecomendadas: {
    width: 200,
    height: 180,
    backgroundPosition: "center",
  },
  imgTiposAlojamiento: {},
});
//fetchCardsHotels(page, price, amenities, type, accommodates, score)
const Home = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchCardsHotels("1", "asc", "TV", "Apartment", 4, 0));
  }, []);
  const classes = useStyle();

  return (
    <div>
      <Grid container justifyContent="center">
        <Grid item xs={12} className={classes.containerFilters}>
          <Typography variant="h5">EXPLORA LOS ANDES !!!</Typography>
          <Grid>
            <Box border={2} className={classes.boxFilters}>
              <Grid>
                <Typography variant="subtitle2">
                  ¿A donde quieres ir?
                </Typography>
                <input placeholder="Escoge el destino"></input>
              </Grid>
              <Grid>
                <Typography variant="subtitle2">Fecha de llegada</Typography>
                <input placeholder="Elige la fecha"></input>
              </Grid>
              <Grid>
                <Typography variant="subtitle2">Fecha de salida</Typography>
                <input placeholder="Elige la fecha"></input>
              </Grid>
              <Grid>
                <Typography variant="subtitle2">¿Cuántos viajan?</Typography>
                <input placeholder="2 adultos, 0 niños"></input>
              </Grid>
              <Grid>
                <SearchIcon />
              </Grid>
            </Box>
          </Grid>
          <br />
        </Grid>
        <Grid
          item
          xs={8}
          justifyContent="center"
          direction="row"
          container
          spacing={1}
        >
          <Grid>
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
          <br />
          <br />
        </Grid>
        <Grid container item xs={8} justifyContent="center">
          <Typography variant="h6">
            EXPLORA SEGUN EL TIPO DE ALOJAMIENTO QUE QUIERES DISFRUTAR
          </Typography>
          <Grid item xs={8} justifyContent="center" container>
            <Grid
              style={{
                backgroundImage: `url(${Tipos1})`,
                backgroundSize: "cover",
                width: "40%",
                height: "auto",
                backgroundPosition: "center",
              }}
            >
              <Typography variant="subtitle1">
                Hostales & Bed & Breakfast
              </Typography>
              <Button>Explorar</Button>
            </Grid>
            <Grid
              style={{
                backgroundImage: `url(${Tipos2})`,
                backgroundSize: "cover",
                width: "40%",
                height: "auto",
                backgroundPosition: "center",
              }}
            >
              <Typography variant="subtitle1">Casas y Apartamentos</Typography>
              <Button>Explorar</Button>
            </Grid>
            <Grid
              style={{
                backgroundImage: `url(${Tipos3})`,
                backgroundSize: "cover",
                width: "40%",
                height: "auto",
                backgroundPosition: "center",
              }}
            >
              <Typography variant="subtitle1">Fuera de lo comun</Typography>
              <Button>Explorar</Button>
            </Grid>
            <br />
          </Grid>
        </Grid>
        <Grid item xs={8}>
          <Box
            border={2}
            style={{
              backgroundImage: `url(${Chica})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            <Box>
              <Typography variant="subtitle1">
                Tienes un inmueble para alquilar? Regístrate como Host y empieza
                a recibir huéspedes
              </Typography>
            </Box>
            <Button>Quiero set Host !</Button>
          </Box>
        </Grid>
      </Grid>
    </div>
  );
};

export default Home;
