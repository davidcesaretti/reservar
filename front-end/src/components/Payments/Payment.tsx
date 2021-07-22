import React, { useEffect } from "react";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CssBaseline from "@material-ui/core/CssBaseline";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import CardComp from "../CardComp/CardComp";
import Footer from "../Footer/Footer";
import NavBarPago from "../Nav/NavPago";
import Recom1 from "../../Image/recom1.jpeg";
import LogoMP from "../../Image/logomercadopago.jpg";
import Typography from "@material-ui/core/Typography";
import Link from "@material-ui/core/Link";
import Reservation from "../Payments/Reservation";
import Huespedes from "../Payments/Huespedes";
import Confirmation from "../Payments/Confirmation";
import { Button } from "@material-ui/core";
import Paper from "@material-ui/core/Paper";
import CardMedia from "@material-ui/core/CardMedia";
import axios from "axios";
import { useSelector } from "react-redux";

const useStyles = makeStyles((theme) => ({
  nav: {},

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
  cardH: {
    display: "flex",
    flexDirection: "column",
    paddingBottom: 100,
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

  rootR: {
    minWidth: 275,
  },
  bulletR: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)",
  },
  titleR: {
    fontSize: 14,
  },
  posR: {
    marginBottom: 12,
  },
  titleInfo: {
    fontSize: 25,
    marginLeft: 300,
    marginTop: 0,
    textDecoration: "underline",
  },
  titleForm: {
    fontSize: 25,
    marginLeft: -100,
    marginTop: 70,
  },
  titleBut: {
    marginLeft: 350,
    marginTop: 80,
    marginBottom: 50,
    backgroundColor: "secundary",
    color: "white",
  },
  titleCondi: {
    marginLeft: 0,
    marginTop: 0,
    marginBottom: 10,
    textAlign: "center",
  },
  logoMerc: {
    borderRadius: "2em",
    backgroundPosition: "center",
    marginLeft: -200,
  },
}));

export default function Pay({
  fechaLlegada,
  fechaSalida,
  huespedes,
  info_user,
}) {
  const detailhotel = useSelector((state: any) => state.categorieDetail);
  fechaLlegada = "2021-08-15T16:45:00.000+00:00";
  fechaSalida = "2021-08-20T16:45:00.000+00:00";
  huespedes = {
    adulto: 2,
    niño: 1,
  };

  info_user = {
    direccion: "25 de mayo 120",
    ciudad: "Buenos Aires",
    pais: "Argentina",
    telefono: "+54 9 1139384440",
  };
  const classes = useStyles();
  const bull = <span className={classes.bulletR}>|</span>;
  const map1 = [1];

/*   const pago = {
    title: "mariano",
    unit_price: price,
  };

  const onSubmit = (ev) => {
    ev.preventDefault();
    axios.post("http://localhost:3001/mp", pago);
  }; */

  return (
    <React.Fragment>
      <CssBaseline />
      <NavBarPago />
      <main style={{ marginLeft: "0px" }}>
        <Container className={classes.cardGrid} maxWidth="md">
          <Typography>
            <Link>Regresar</Link>
          </Typography>
          <Typography variant="h6" gutterBottom>
            DATOS DE LA RESERVACION
          </Typography>
          <CardContent>
            <Grid container spacing={4}>
              <Grid item xs={12} sm={6} className={classes.card}>
                <Card className={classes.card}></Card>
                <Reservation price fechaLlegada fechaSalida huespedes />
              </Grid>
              {detailhotel.posts &&
                detailhotel.posts(
                  <Grid item xs={12} sm={6} className={classes.card}>
                    <Card className={classes.card}>
                      <CardComp
                        _id={detailhotel[0]._id}
                        image={detailhotel[0].image}
                        score={detailhotel[0].score}
                        name={detailhotel[0].name}
                        type={detailhotel[0].type}
                        address={detailhotel[0].address}
                        accommodates={detailhotel[0].accommodates}
                        beds={detailhotel[0].beds}
                        price={detailhotel[0].price}
                        click={""}
                      />
                    </Card>
                </Grid>
                )}
            </Grid>
          </CardContent>
          <Typography gutterBottom className={classes.titleInfo}>
            INFORMACION DE LOS HUESPEDES
          </Typography>
          <Grid container spacing={0}>
            <Grid item xs={12} sm={6} className={classes.cardH}>
              <CardContent>
                {map1 &&
                  map1.map((e) => (
                    <Grid item key={e} xs={12} sm={6} className={classes.card}>
                      <Huespedes />
                    </Grid>
                  ))}
              </CardContent>
            </Grid>
            <Grid item xs={12} sm={6} className={classes.card}>
              <Confirmation />
              <Typography gutterBottom className={classes.titleForm}>
                FORMA DE PAGO
              </Typography>
              <Grid item xs={2}>
                <img src={`${LogoMP}`} className={classes.logoMerc} />
              </Grid>
            </Grid>
          </Grid>
          <div>

          <Button
            variant="contained"
            color="secondary"
            className={classes.titleBut}
            >
            Confirmar Reservacion
          </Button>
            </div>
          <Paper elevation={0} className={classes.titleCondi}>
            *Tu reserva se ha realizado directamente en el Alojamiento y al
            completarla aceptas las condiciones de la reserva , las condiciones
            generales y las politicas de privacidad
          </Paper>
          <Paper elevation={0}>
            ____________________________________________________________________________________________________________________________________________
          </Paper>
        </Container>
      </main>
      {/* Footer */}
      <div style={{ marginLeft: "200px", width: "80%" }}>
        <Footer />
        {/* End footer */}
      </div>
    </React.Fragment>
  );
}
