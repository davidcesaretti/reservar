import * as React from 'react';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Conteiner from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({

  dator:{
        color: "#000000",
        border:"inherent",
        fontSize:"1 rem",
        alignItems:"flex-box"

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
    marginBottom:5,
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
    display: 'inline-block',
    margin: '0 40px',
    transform: 'scale(0.8)',
  },
  titleR: {
    fontSize: 14,
  },
  posR: {
    marginBottom: 12,
  },
  
  paperR: {
    display: 'flex',
    flexWrap:'wrap',
    width:200,
    height:20,
    marginLeft:50,
    marginTop:20,
    marginBottom:20,
  },
  paperR1: {
    display: 'flex',
    flexWrap:'wrap',
    width:200,
    height:20,
    marginLeft:50,
    marginTop:30,
    marginBottom:20,
  }

,
   paper2R: {
    marginLeft:50,
    marginTop:0,
    marginBottom:0,
  },
  paper3R: {
    marginLeft:50,
    marginTop:0,
    marginBottom:25,
    fontSize: 18,
    color:"blue",
    fontWeight:500,
  },

  textR:{
     multiline:'true',
     disabled:"false"
 
  },
  textFI: {
    display: 'flex',
    flexWrap:'wrap',
    width:200,
    height:30,
    marginLeft:0,
    marginTop:10,
    marginBottom:0,
 
  },
  textCod: {
    display: 'flex',
    flexWrap:'wrap',
    width:50,
    height:30,
    marginLeft:45,
    marginTop:10,
    marginBottom:0,
 
  },
  textTel: {
    display: 'flex',
    flexWrap:'wrap',
    width:145,
    height:30,
    marginLeft:8,
    marginTop:10,
    marginBottom:0,
 
  },
  textN: {
    width:120,
    height:20,
    marginLeft:0,
    marginTop:20,
    marginBottom:0,
 
  },
  nav:{
    backgroundColor:"white",
    width:400,
    height:200,
    marginTop:20,
  }

}));


export default function PaymentForm() {

  const classes = useStyles();
  return (
    <React.Fragment>
      <Conteiner className={classes.nav}>
              <Typography variant="h6" gutterBottom>
        Tus Datos
      </Typography>
      <Grid container spacing={2}>
        <Grid item >
          <Paper elevation={0} className={classes.textN}>Direccion</Paper>
        </Grid>
        <Grid item>
        <TextField id="direccion"  size="small" variant="outlined" className={classes.textFI}/>
        </Grid>
      </Grid>
      <Grid container spacing={2}>
        <Grid item >
          <Paper elevation={0} className={classes.textN}>Ciudad</Paper>
        </Grid>
        <Grid item>
        <TextField id="ciudad"  size="small" variant="outlined" className={classes.textFI}/>
        </Grid>
      </Grid>
      <Grid container spacing={2}>
        <Grid item >
          <Paper elevation={0} className={classes.textN}>Pais</Paper>
        </Grid>
        <Grid item>
        <TextField id="pais"  size="small" variant="outlined" className={classes.textFI}/>
        </Grid>
      </Grid>
      <Grid container spacing={2}>
        <Grid item xs={3}>
          <Paper elevation={0} className={classes.textN}>Telefono movil</Paper>
        </Grid>
        <Grid item xs={3}>
        <TextField id="codigo"  size="small" variant="outlined" className={classes.textCod}/>
        </Grid>
        <Grid item xs={3}>
        <TextField id="telefono"  size="small" variant="outlined" className={classes.textTel}/>
        </Grid>
      </Grid>
      </Conteiner>
    </React.Fragment>
  );
}