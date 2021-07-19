import * as React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import FormHelperText from '@material-ui/core/FormHelperText';
import Container from '@material-ui/core/Container';


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
  gridH:{
    width:500,
    height:100,
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
    marginLeft:0,
    marginTop:0,
    marginBottom:0,
    width:180,
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
  textF: {
    width:200,
    height:100,
    marginLeft:50,
    marginTop:50,
    marginBottom:50,
    margin:'normal',
  },
  textN: {
    width:120,
    height:20,
    marginLeft:0,
    marginTop:10,
    marginBottom:0,
 
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
  nav:{
    backgroundColor:"white",
    width:400,
    height:200,
  }

}));

export default function AddressForm() {
  const classes = useStyles();
  return (
    <React.Fragment>
      <Container  className={classes.nav}>
        <Typography variant="h6" gutterBottom>
        Huesped
      </Typography>
      <Grid container spacing={2}>
        <Grid item >
          <Paper elevation={0} className={classes.textN}>Nombre Completo</Paper>
        </Grid>
        <Grid item>
        <TextField id="outlined-basic"  size="small" variant="outlined" className={classes.textFI}/>
        </Grid>
      </Grid>
      <Grid container spacing={2}>
        <Grid item >
          <Paper elevation={0} className={classes.textN}>Documento Identificacion</Paper>
        </Grid>
        <Grid item>
        <TextField id="outlined-basic"  size="small" variant="outlined" className={classes.textFI}/>
        </Grid>
      </Grid>
      <Grid container spacing={2}>
        <Grid item >
          <Paper elevation={0} className={classes.textN}>Correo Electronico</Paper>
        </Grid>
        <Grid item>
        <TextField id="outlined-basic"  size="small" variant="outlined" className={classes.textFI}/>
        </Grid>
      </Grid>
      </Container>
    </React.Fragment>
  );
}