import React, { useEffect } from "react";
import Card from "@material-ui/core/Card";
import CssBaseline from "@material-ui/core/CssBaseline";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import CardComp from "../CardComp/CardComp";
import Footer from "../Footer/Footer";
import CheckboxList from "../Filters/Filters";
import { useDispatch, useSelector } from "react-redux";
import {
  addFavourites,
  FechasReserva,
  fetchCardsHotels,
  getFavos,
  getListOfCities,
} from "../../actions";
import NavBar from "../Nav/Nav2";
import Calendary from "../Calendary/Calendary";
import { useState } from "react";
import TextField from "@material-ui/core/TextField";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import { Button, Grid } from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import { Link } from "react-router-dom";
import { useAuth } from "../../firebase/index";
import Paginado from "../Paginado/Paginado";
import Autocomplete from "@material-ui/lab/Autocomplete";
import search from "../../Image/search.png"

const useStyles = makeStyles((theme) => ({
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
    paddingTop: theme.spacing(6),
    paddingBottom: theme.spacing(8),
    minHeight: "1480px",
    
    
  },
  card: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
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

  
}));

export default function Album() {
  const classes = useStyles();
  const cards = useSelector((state: any) => state.cardsHotel);
  const auth = useAuth();
  const [cities, setCities] = useState(undefined);
  const [guest, setGuest] = useState(undefined);
  const email = auth?.user?.email;
  const fechas = useSelector((state: any) => state.fechas);
  const userfavs = useSelector((state: any) => state.userfavossss);
  const listOfCities = useSelector((state:any) => state.listOfCities)
  const dispatch = useDispatch();
  let cantGuests = ["1","2","3","4","5","6","7","8","9"]

  useEffect(() => {
    dispatch(getListOfCities())
  }, [])

  function busqueda() {
    dispatch(FechasReserva({ ...fechas, cities, guest }));

    dispatch(
      fetchCardsHotels(
        1,
        undefined,
        undefined,
        undefined,
        guest,
        undefined,
        cities === "" ? undefined : cities,
        fechas
      )
    );
  }

  useEffect(() => {
    dispatch(getFavos(email));
  }, []);

  let arrayfavs = [];

  useEffect(() => {
    userfavs.map((e) => arrayfavs.push(e._id));
  }, [userfavs]);

  const [fav, setFav]: any = useState({
    favos: [],
    email: email,
  });

  useEffect(() => {
    arrayfavs.map((e) => (!fav.favos.includes(e) ? fav.favos.push(e) : ""));
  }, [arrayfavs]);

  const handleClick = (e) => {
    e.preventDefault();

    if (fav?.favos?.includes(e.currentTarget.value)) {
      setFav({
        ...fav,
        favos: fav.favos.filter((x) => x !== e.currentTarget.value),
      });
    } else {
      setFav({ ...fav, favos: fav.favos.concat(e.currentTarget.value) });
    }
  };

  useEffect(() => {
    dispatch(addFavourites(fav));
  }, [fav]);

  return (
    <React.Fragment>
      <CssBaseline />
      <NavBar />
      <CheckboxList />
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          paddingTop: "16px",
          paddingBottom: "0",
          marginTop: "20px",
          
        }}
      >
        <FormControl>
          <FormLabel
            style={{
              display: "flex",
              border: "solid",
              backgroundColor: "whitesmoke",
              padding: "0.5rem 0.8rem",
              borderRadius: "1em",
              alignItems: "center",
            }}
          >
            <Autocomplete  
                  id="ciudades"
                  options={listOfCities}
                  onChange={(event: any, newValue: any | null) => {
                    setCities(newValue);
                  }}
                  getOptionLabel={(listOfCities) => listOfCities}
                  style={{ width: 220 }}
                  renderInput={(params:any) => <TextField {...params} label="Where are you going?" variant="standard" />}
                />
            <Calendary />
            <Autocomplete  
                  id="cantGuests"
                  options={cantGuests}
                  onChange={(event: any, newValue: any | null) => {
                    setGuest(newValue);
                  }}
                  style={{ width: 180,marginRight:12 }}
                  renderInput={(params:any) => <TextField {...params} label="Guests" variant="standard" />}
                />
            <Link to={"/categories"}>
              <Button
                variant="contained"
                color="secondary"
                size="small"
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  height: "70%",
                  alignSelf: "center",
                  borderRadius: "1em",
                }}
                onClick={() => busqueda()}
              >
                <SearchIcon />
              </Button>
            </Link>
          </FormLabel>
        </FormControl>
      </div>
      
      <main style={{ marginLeft: "200px" }}>
      
        <Container className={classes.cardGrid} maxWidth="md">
         
          <Grid container spacing={4}>
            {cards?.posts?.length?
              cards.posts.map((e,i) => (
                <Grid item key={i} xs={12} sm={6} md={6}>
                  <Card className={classes.card}>
                    <CardComp
                      _id={e._id}
                      image={e.image}
                      score={e.score}
                      name={e.name}
                      type={e.type}
                      address={e.address}
                      accommodates={e.accommodates}
                      beds={e.beds}
                      price={e.price}
                      click={handleClick}
                      boton={false}
                      deleteButton={false}
                    />
                  </Card>
                </Grid >
              )):<div style={{marginLeft:"350px"}}>
                <img src={search} alt="search" width="150px" height="150px" style={{marginLeft:"50px", marginTop:"50px"}}/>
                <h2 style={{fontSize:"35px"}}>No results found...</h2>
              </div>
            }
          </Grid>
        </Container>
        <Paginado />
      </main>
      {/* Footer */}
      <div style={{ marginLeft: "200px", width: "80%" }}>
        <Footer />
        {/* End footer */}
      </div>
    </React.Fragment>
  );
}
