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
import { useDispatch, useSelector } from "react-redux";
import { BotonesPaginado, fetchCardsHotels } from "../../actions";
import { useState } from "react";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import InputLabel from "@material-ui/core/InputLabel";
import LineWeightIcon from "@material-ui/icons/LineWeight";

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
    marginTop: "153px",
    marginLeft: "20px",
    width: "20%",
    height: "148%",
    borderRadius: "10px"
  },
  nombredetipo: {
    color: "white",
    padding: "30px 0",
    height: "30px",
    "& span": {
      fontSize: "13px",
    },
  },

  nombredecat: {
    marginTop: "27px",
    marginBottom: "10px",
    fontSize:"17px"
  },
  titlecat:{
    fontSize:"21px",
    marginTop: "27px",
    marginBottom: "10px",
  },

  btn: {
    backgroundColor: "#A6A845" /* Green */,
    color:"white",
    cursor: "pointer",
    "&:focus": {
      background: "white",
      color: "black"
    },
    border: "none",
    
    padding: "10px",
    textAlign: "center",
    textDecoration: "none",
    display: "flex",
    fontSize: "16px",
    borderRadius: "5px",
    margin: "10px",
  },
  select: {
    color: "white",
    "&:before": {
      borderColor: "white",
    },
  },

  selectugly: {
    color: "white",
    backgroundColor: "#A6A845",
    borderRadius: "5px",
    padding: "4px 9px",
    marginLeft: "6px",

    "&:before": {
      
      borderRadius: "5px"
    },
    minWidth: "100px",
  },

  label1: {
    color: "white",

    "&:before": {
      color: "black",
    },
  },

  btnEstado: {
    backgroundColor: "#A6A845" /* Green */,
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
    margin: "25px 0",
    width: "90%",
  },
});

let Categories = [
  {
    title: "Type",
    keyword: "type",
    checked: undefined,
    filtros: [
      { id: "Hostel", msg: "Hostel" },
      { id: "Condominium", msg: "Condominium" },
      { id: "House", msg: "House" },
      { id: "Apartment", msg: "Apartment" },
      { id: "Loft", msg: "Loft" },
      { id: "Guesthouse", msg: "Guesthouse" },
    ],
  },
  {
    title: "Amenities",
    keyword: "amenities",
    checked: undefined,

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
    checked: undefined,
    filtros: [
      { id: 10, msg: "Excelent" },
      { id: 9, msg: "Amazing" },
      { id: 8, msg: "Very nice" },
      { id: 7, msg: "Cool" },
      { id: 0, msg: "No rating" },
    ],
  },
  {
    title: "Price",
    iconos: true,
  },
  {
    title: "Popular",
    keyword: "amenities",
    checked: undefined,
    filtros: [
      "Pets allowed",
      "Smoking allowed",
      "Wheelchair accessible",
      "Kitchen",
    ],
  },
];
//fetchCardsHotels(page, price, amenities, type, accommodates, score);
export default function CheckboxList() {
  const fechasAnteriores = useSelector((state: any) => state.fechas);
  const cards = useSelector((state: any) => state.cardsHotel);
  const classes = useStyles();
  const dispatch = useDispatch();
  const [paginado, setPaginado] = useState(1);

  if (Array.isArray(cards)) {
    dispatch(
      fetchCardsHotels(
        paginado,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined
      )
    );
  }
  const [dataFilter, setDataFilter] = useState({
    price: undefined,
    amenities: [],
    type: undefined,
    accommodates: undefined,
    score: undefined,
  });
  useEffect(() => {
    dispatch(
      BotonesPaginado({
        paginado,
        price: dataFilter.price || "nada",
        amenities: dataFilter.amenities || "nada",
        type: dataFilter.type || fechasAnteriores.type || "nada",
        guest: dataFilter.accommodates || fechasAnteriores.guest || "nada",
        score: dataFilter.score || "nada",
        cities:
          fechasAnteriores.cities === ""
            ? undefined
            : fechasAnteriores.cities || "nada",
        fechas: undefined || "nada",
      })
    );
  }, [
    dispatch,
    fechasAnteriores.cities,
    fechasAnteriores.guest,
    dataFilter.type,
    paginado,
    dataFilter.price,
    dataFilter.amenities,
    fechasAnteriores.type,
    dataFilter.accommodates,
    dataFilter.score,
  ]);

  const [pagination, setPagination] = useState({
    price: undefined,
    amenities: [],
    type: undefined,
    accommodates: undefined,
    score: undefined,
  });

  const resetData = () => {
    setDataFilter({
      price: undefined,
      amenities: [],
      type: undefined,
      accommodates: undefined,
      score: undefined,
    });
  };

  const setAmeniHandler = (e) => {
    e.preventDefault();

    setDataFilter({
      ...dataFilter,
      [e.target.name]: dataFilter[e.target.name].concat(e.target.value),
    });
  };

  const setDataHandler = (e) => {
    e.preventDefault();

    setDataFilter({
      ...dataFilter,
      [e.target.name]: e.target.value,
    });
  };

  const handleChecks = (e) => {
    let flag = true;
    dataFilter["amenities"].forEach((c) => {
      if (e.target.value === c) {
        setDataFilter({
          ...dataFilter,
          amenities: dataFilter["amenities"].filter(
            (a) => e.target.value !== a
          ),
        });
        return (flag = false);
      }
    });
    if (flag) {
      setDataFilter({
        ...dataFilter,
        [e.target.name]: dataFilter[e.target.name].concat(e.target.value),
      });
    }
  };

  const submitData = (e) => {
    e.preventDefault();
    setPagination(dataFilter);
    // if (dataFilter["amenities"].length < 1) {
    //   dataFilter["amenities"] = undefined;
    // }
    //  setPaginado(1);
    dispatch(
      //fetchCardsHotels(page, price, amenities, type, accommodates, score);
      fetchCardsHotels(
        paginado,
        dataFilter.price,
        dataFilter.amenities,
        dataFilter.type,
        dataFilter.accommodates || fechasAnteriores.guest,
        dataFilter.score,
        fechasAnteriores.cities === "" ? undefined : fechasAnteriores.cities,
        undefined
      )
    );

    // e.currentTarget.reset();

    // resetData();
  };

  const onPrev = (e) => {
    // if (pagination.page > 2 && pagination.page !== undefined) {

    setPaginado(paginado - 1);
    dispatch(
      //fetchCardsHotels(page, price, amenities, type, accommodates, score);
      fetchCardsHotels(
        paginado,
        dataFilter.price,
        dataFilter.amenities,
        dataFilter.type || fechasAnteriores.type,
        dataFilter.accommodates || fechasAnteriores.guest,
        dataFilter.score,
        fechasAnteriores.cities === "" ? undefined : fechasAnteriores.cities,
        undefined
      )
    );
    //}
  };

  const onNext = (e) => {
    setPaginado(paginado + 1);
    dispatch(
      //fetchCardsHotels(page, price, amenities, type, accommodates, score);
      fetchCardsHotels(
        paginado,
        dataFilter.price,
        dataFilter.amenities,
        dataFilter.type || fechasAnteriores.type,
        dataFilter.accommodates || fechasAnteriores.guest,
        dataFilter.score,
        fechasAnteriores.cities === "" ? undefined : fechasAnteriores.cities,
        undefined
      )
    );
  };
function goTop () {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
})
}

  return (
    <div>
      <form onSubmit={submitData}>
        <Container maxWidth="xs" className={classes.filterbox}>
          <h2 className={classes.titlecat}>Filter by...</h2>
          {Categories.map((cat, index) => (
            <>
              <Grid
                key={index}
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
                  {cat.title !== "Type" && cat.title !== "Score" ? (
                    cat?.filtros?.map((value, index) => (
                      <ListItem className={classes.nombredetipo} key={index}>
                        <GreenCheckbox
                          edge="start"
                          value={value}
                          checked={cat.checked}
                          name={cat.keyword}
                          onChange={handleChecks}
                          className={classes.select}
                        />
                        <ListItemText primary={value} />
                      </ListItem>
                    ))
                  ) : (
                    <ListItem className={classes.nombredetipo}>
                      <FormControl>
                        <InputLabel className={classes.label1}></InputLabel>
                        <Select
                          name={cat.keyword}
                          onChange={setDataHandler}
                          className={classes.selectugly}
                          defaultValue={"Select"}
                          
                        >
                          {cat?.filtros?.map((value, index) => (
                            <MenuItem key={index} value={value.id}>{value.msg}</MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                      <ListItemText />
                    </ListItem>
                  )}
                </List>
              </Grid>
              <Divider />
            </>
          ))}
          <Button
            className={classes.btnEstado}
            variant="text"
            color="inherit"
            type="submit"
            onClick={()=> goTop()}
          >
            <LineWeightIcon />
            Filter
          </Button>
        </Container>
      </form>
    </div>
  );
}
