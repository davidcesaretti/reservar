import { withStyles, makeStyles } from "@material-ui/core/styles";
import { green } from "@material-ui/core/colors";
import {
  List,
  ListItem,
  ListItemText,
  Grid,
  Divider,
  Container,
  Button,
} from "@material-ui/core";
import Checkbox, { CheckboxProps } from "@material-ui/core/Checkbox";
import ExpandLessIcon from "@material-ui/icons/ExpandLess";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import React from "react";

const GreenCheckbox = withStyles({
  root: {
    color: green[400],
    "&$checked": {
      color: green[600],
    },
  },
  checked: {},
})((props: CheckboxProps) => <Checkbox color="secondary" {...props} />);

const useStyles = makeStyles({
  filterbox: {
    background: "#324021",
    position: "absolute",
    color: "white",
    marginTop: "120px",
    marginLeft: "20px",
    width: "20%",
  },
  nombredetipo: {
    padding: "0",
    height: "30px",
    "& span": {
      fontSize: "13px",
    },
  },
  nombredecat: {
    marginBottom: "0",
  },
});

const Categories = [
  {
    title: "Tipos de alojamiento",
    filtros: [
      "Hostal",
      "Bed & Breakfast",
      "Casa",
      "Apartamento",
      "Fuera de lo común",
    ],
  },
  {
    title: "Filtros Populares",
    filtros: [
      "Piscina",
      "Estacionamiento",
      "Playa",
      "Aire acondicionado",
      "Wifi incluido",
    ],
  },
  {
    title: "Puntuación",
    filtros: ["Fantástico", "Muy bueno", "Bueno", "Agradable"],
  },
  {
    title: "Precio",
    iconos: true,
  },
  {
    title: "Otros Filtros",
    filtros: [
      "Cancelación gratuita",
      "Admite mascotas",
      "Apto para fumadores",
      "Adaptado para personas de movilidad reducida",
      "Servicio de habitación",
    ],
  },
];

export default function CheckboxList() {
  const classes = useStyles();
  return (
    <Container maxWidth="xs" className={classes.filterbox}>
      <h3 className={classes.nombredecat}>FILTRAR POR</h3>
      {Categories.map((cat) => (
        <>
          <Grid
            container
            direction="column"
            justifyContent="space-evenly"
            alignItems="flex-start"
          >
            <h4 className={classes.nombredecat}>{cat.title}</h4>
            {cat.iconos && (
              <>
                <Button color="inherit" startIcon={<ExpandLessIcon />}>
                  Max - Min
                </Button>
                <Button color="inherit" startIcon={<ExpandMoreIcon />}>
                  Min - Max
                </Button>
              </>
            )}
            <List>
              {cat.filtros &&
                cat.filtros.map((value) => (
                  <ListItem className={classes.nombredetipo} key={value}>
                    <GreenCheckbox edge="start" />
                    <ListItemText primary={value} />
                  </ListItem>
                ))}
            </List>
          </Grid>
          <Divider />
        </>
      ))}
    </Container>
  );
}
