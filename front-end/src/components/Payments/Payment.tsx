import React, { useEffect, useState } from "react";
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
import { useSelector, useDispatch } from "react-redux";
import { getBooking } from "../../actions";
import { useAuth } from "../../firebase";

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
  const stateregister = useSelector((state: any) => state.stateRegister);

  fechaLlegada = stateregister.fechaLlegada;
  fechaSalida = stateregister.fechaSalida;

  const [link, setLink] = useState("");

  info_user = {
    direccion: "25 de mayo 120",
    ciudad: "Buenos Aires",
    pais: "Argentina",
    telefono: "+54 9 1139384440",
  };
  const classes = useStyles();
  const bull = <span className={classes.bulletR}>|</span>;
  const map1 = [1];
  const auth = useAuth();
  let email = stateregister.email;
  const dispatch = useDispatch();
  useEffect(() => {
    const pago = {
      title: detailhotel[0]?.name,
      unit_price: stateregister.preciofinal,
    };

    axios.post("http://localhost:3001/mp", pago).then((res) => {
      setLink(res.data.sandbox_init_point);
      const reserv = {
        fechaSalida,
        fechaLlegada,
        email: stateregister.email || "dario.velazquez10@gmail.com",
        price: stateregister.preciofinal,
        Prop_id: detailhotel[0]._id,
        payment_id: res.data.id,
        host: detailhotel[0].host,
        propname: detailhotel[0].name,
        propimg: detailhotel[0].image,
        /* const { fechaSalida, fechaLlegada, email, Prop_id, price, payment_id } = */
      };
      axios.post("http://localhost:3001/reserva", reserv); //guardamos en la bd
    });
  }, []);

  return (
    <>
      <CssBaseline />
      <NavBarPago />
      <main style={{ marginLeft: "0px" }}>
        <Container className={classes.cardGrid} maxWidth="md">
          <Typography>
            <Link>Back</Link>
          </Typography>
          <Typography variant="h6" gutterBottom>
            BOOKINGS INFORMATION
          </Typography>
          <CardContent>
            <Grid container spacing={4}>
              <Grid item xs={12} sm={6} className={classes.card}>
                <Card className={classes.card}></Card>
                <Reservation
                  price={detailhotel[0]?.price}
                  fechaLlegada
                  fechaSalida
                  huespedes={detailhotel[0]?.accommodates}
                />
              </Grid>
              {detailhotel && (
                <Grid item xs={12} sm={6} className={classes.card}>
                  <Card className={classes.card}>
                    <CardComp
                      _id={detailhotel[0]?._id}
                      image={detailhotel[0]?.image}
                      score={detailhotel[0]?.score}
                      name={detailhotel[0]?.name}
                      type={detailhotel[0]?.type}
                      address={detailhotel[0]?.address}
                      accommodates={detailhotel[0]?.accommodates}
                      beds={detailhotel[0]?.beds}
                      price={detailhotel[0]?.price}
                      click={""}
                      boton={false}
                      deleteButton={false}
                    />
                  </Card>
                </Grid>
              )}
            </Grid>
          </CardContent>
          <Typography gutterBottom className={classes.titleInfo}>
            {/* GUEST INFORMATION */}
          </Typography>
          <Grid container spacing={0}>
            <Grid item xs={12} sm={6} className={classes.cardH}>
              <CardContent>
                {map1 &&
                  map1.map((e) => (
                    <Grid item key={e} xs={12} sm={6} className={classes.card}>
                      {/* <Huespedes /> */}
                    </Grid>
                  ))}
              </CardContent>
            </Grid>
            <Grid item xs={12} sm={6} className={classes.card}>
              {/* <Confirmation /> */}
              <Typography gutterBottom className={classes.titleForm}>
                PAYMENT METHOD
              </Typography>
              <Grid item xs={2}>
                <img src={`${LogoMP}`} className={classes.logoMerc} />
              </Grid>
            </Grid>
          </Grid>
          {!link ? (
            <p>Aguarde un momento....</p>
          ) : (
            <div>
              <a href={link} style={{ textDecoration: "none" }}>
                <Button
                  variant="contained"
                  color="secondary"
                  className={classes.titleBut}
                >
                  Confirm booking
                </Button>
              </a>
            </div>
          )}

          <Paper elevation={0} className={classes.titleCondi}>
            *Your reservation has been made directly at the Lodging and by
            completing it you accept the booking conditions. by completing it
            you accept the booking conditions, the general conditions and the
            general conditions and the privacy policy
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
    </>
  );
}
