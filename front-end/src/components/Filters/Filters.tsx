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
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchCardsHotels } from "../../actions";
import { useState } from "react";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import InputLabel from "@material-ui/core/InputLabel";

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

  btn: {
    backgroundColor: "#324021" /* Green */,
    "&:hover": {
      background: "white",
      transition: "0.4s",
      color: "black",
    },
    border: "none",
    color: "white",
    padding: "10px",

    textAlign: "center",
    textDecoration: "none",
    display: "flex",
    fontSize: "16px",
    borderRadius: "5px",
    margin: "10px",
  },
});

const Categories = [
  {
    title: "Type",
    keyword: "type",

    filtros: [
      "Hostel",
      "Condominium",
      "House",
      "Apartment",
      "Loft",
      "Guesthouse",
    ],
  },
  {
    title: "Amenities",
    keyword: "amenities",

    filtros: [
      "Pool",
      "Free parking on premises",
      "Long term stays allowed",
      "Air conditioning",
      "Wifi",
    ],
  },
  {
    title: "Score",
    keyword: "score",
    filtros: ["Fantástico", "Muy bueno", "Bueno", "Agradable"],
  },
  {
    title: "Price",
    iconos: true,
  },
  {
    title: "Popular",
    keyword: "amenities",

    filtros: [
      "Cancelación gratuita",
      "Pets allowed",
      "Smoking allowed",
      "Wheelchair accessible",
      "Kitchen",
    ],
  },
];
//fetchCardsHotels(page, price, amenities, type, accommodates, score);
export default function CheckboxList() {
  const classes = useStyles();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(
      fetchCardsHotels(2, undefined, undefined, undefined, undefined, undefined)
    );
  }, []);

  const [dataFilter, setDataFilter] = useState({
    page: undefined,
    price: undefined,
    amenities: [],
    type: undefined,
    accommodates: undefined,
    score: undefined,
  });

  const setAmeniHandler = (e) => {
    e.preventDefault();
    console.log(e.target.name, "target name");
    console.log(e.target.value, "target value");

    setDataFilter({
      ...dataFilter,
      [e.target.name]: dataFilter[e.target.name].concat(e.target.value),
    });
  };

  const setDataHandler = (e) => {
    e.preventDefault();
    console.log(e.target.name, "target name");
    console.log(e.target.value, "target value");

    setDataFilter({
      ...dataFilter,
      [e.target.name]: e.target.value,
    });
  };
  return (
    <Container maxWidth="xs" className={classes.filterbox}>
      <h3 className={classes.nombredecat}>Filter by...</h3>
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
                <button
                  className={classes.btn}
                  value="asc"
                  name="price"
                  onClick={setDataHandler}
                >
                  Min - Max
                </button>
                <button
                  className={classes.btn}
                  value="desc"
                  name="price"
                  onClick={setDataHandler}
                >
                  Max - Min
                </button>
              </>
            )}
            <List>
              {cat.title !== "Type" && cat.title !== "Score"
                ? cat?.filtros?.map((value) => (
                    <ListItem className={classes.nombredetipo} key={value}>
                      <GreenCheckbox
                        edge="start"
                        value={value}
                        name={cat.keyword}
                        onChange={setAmeniHandler}
                      />
                      <ListItemText primary={value} />
                    </ListItem>
                  ))
                : cat?.filtros?.map((value) => (
                    <ListItem className={classes.nombredetipo} key={value}>
                      <FormControl>
                        <InputLabel id="demo-simple-select-label">-</InputLabel>
                        <Select
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          name={cat.keyword}
                          value={value}
                          onChange={setDataHandler}
                        >
                          <MenuItem value={10}>Ten</MenuItem>
                          <MenuItem value={20}>Twenty</MenuItem>
                          <MenuItem value={30}>Thirty</MenuItem>
                        </Select>
                      </FormControl>
                      <ListItemText primary={value} />
                    </ListItem>
                  ))}
            </List>
          </Grid>
          <Divider />
        </>
      ))}
      <Button
        variant="text"
        color="default"
        onClick={() => console.log(dataFilter)}
      >
        Estado
      </Button>
    </Container>
  );
}
