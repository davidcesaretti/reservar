import React, { useEffect } from "react";
import Card from "@material-ui/core/Card";
import CssBaseline from "@material-ui/core/CssBaseline";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import { useSelector, useDispatch } from "react-redux";
import moment from "moment";


const useStyles = makeStyles((theme) => ({
  dator: {
    color: "#000000",
    border: "inherent",
    fontSize: "1 rem",
    alignItems: "flex-box",
  },

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
    marginBottom: 5,
  },
  cardMedia: {
    paddingTop: "55%", // 16:9
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
    height: "100%",
    display: "flex",
    flexDirection: "column",
  },
  bulletR: {
    display: "inline-block",
    margin: "0 40px",
    transform: "scale(0.8)",
  },
  titleR: {
    fontSize: 14,
  },
  posR: {
    marginBottom: 12,
  },

  paperR: {
    display: "flex",
    flexWrap: "wrap",
    width: 200,
    height: 20,
    marginLeft: 50,
    marginTop: 20,
    marginBottom: 20,
  },
  paperR1: {
    display: "flex",
    flexWrap: "wrap",
    width: 200,
    height: 20,
    marginLeft: 50,
    marginTop: 30,
    marginBottom: 20,
  },

  paper2R: {
    marginLeft: 50,
    marginTop: 0,
    marginBottom: 0,
  },
  paper3R: {
    marginLeft: 50,
    marginTop: 0,
    marginBottom: 25,
    fontSize: 18,
    color: "blue",
    fontWeight: 500,
  },

  textR: {
    multiline: "true",
    disabled: "false",
  },
  textN: {
    width: 120,
    height: 20,
    marginLeft: 0,
    marginTop: 10,
    marginBottom: 0,
  },
}));
export default function Reserva({
  price,
  fechaLlegada,
  fechaSalida,
  huespedes,
}) {

  const dispatch = useDispatch();
  const stateregister = useSelector((state: any) => state.stateRegister);

  fechaLlegada = stateregister.fechaLlegada;
  var fechaL = moment(fechaLlegada).format("DD/MM/YY");
  fechaSalida = stateregister.fechaSalida;
  var fechaS = moment(fechaSalida).format("DD/MM/YY");

  var cantidad = moment(fechaLlegada).diff(moment(fechaSalida), "days"); //realizar operacion resta de fechas
  var total = cantidad * price;
  var result = cantidad === 0 ? price : total;
  const classes = useStyles();
  const bull = <span className={classes.bulletR}>|</span>;
  /*useEffect(() => {
    dispatch(detailHotel(id));
  }, []);
  */
  return (
    <React.Fragment>
      <CssBaseline />
      <Card className={classes.card}>
        <Grid container spacing={3}>
          <Grid item xs={6}>
            <Paper elevation={0} className={classes.paperR}>
              Arrival Date {bull}
            </Paper>
          </Grid>
          <Grid item xs={6}>
            <Paper elevation={0} className={classes.paperR}>
              Departure Date
            </Paper>
          </Grid>
        </Grid>
        <Grid container spacing={3}>
          <Grid item xs={6}>
            <Paper elevation={0} className={classes.paper2R}>
              {fechaS}
            </Paper>
          </Grid>
          <Grid item xs={6}>
            <Paper elevation={0} className={classes.paper2R}>
              {fechaL}
            </Paper>
          </Grid>
        </Grid>
        <Paper elevation={0} className={classes.paper2R}>
          _______________________________________________
        </Paper>
        <Paper elevation={0} className={classes.paper2R}>
          GUESTS
        </Paper>
        <Paper
          elevation={0}
          className={classes.paper3R}
        >{`Accommodates:${huespedes}`}</Paper>
      </Card>
      <Card className={classes.card}>
        <Grid container spacing={3}>
          <Grid item xs={6}>
            <Paper elevation={0} className={classes.paperR1}>
              Value per night {bull}
            </Paper>
          </Grid>
          <Grid item xs={6}>
            <Paper elevation={0} className={classes.paperR1}>
              {`$${price}`}
            </Paper>
          </Grid>
        </Grid>
        <Grid container spacing={3}>
          <Grid item xs={6}>
            <Paper elevation={0} className={classes.paper2R}>
              Number of nights
            </Paper>
          </Grid>
          <Grid item xs={6}>
            <Paper elevation={0} className={classes.paper2R}>
              {cantidad}
            </Paper>
          </Grid>
        </Grid>
        <Paper elevation={0} className={classes.paper2R}>
          _______________________________________________
        </Paper>
        <Paper
          elevation={0}
          className={classes.paper3R}
        >{`TOTAL STAY :$  ${result}`}</Paper>
      </Card>
    </React.Fragment>
  );
}
