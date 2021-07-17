import React, { useEffect } from "react";
import AppBar from "@material-ui/core/AppBar";
import Button from "@material-ui/core/Button";
import CameraIcon from "@material-ui/icons/PhotoCamera";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import CssBaseline from "@material-ui/core/CssBaseline";
import Grid from "@material-ui/core/Grid";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Link from "@material-ui/core/Link";
import CardComp from "../CardComp/CardComp";
import Footer from "../Footer/Footer";
import CheckboxList from "../Filters/Filters";
import { useDispatch, useSelector } from "react-redux";
import { fetchCardsHotels } from "../../actions";
import { hotelsReducer } from "../../reducers/hotels";
import NavBar from "../Nav/Nav2";
import { useState } from "react";
import { truncate } from "fs";
import Alert from "@material-ui/lab/Alert";
import { FlashMessage } from "./flashmsg";

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
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
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
}));

export default function Album() {
  const classes = useStyles();
  const cards = useSelector((state: any) => state.cardsHotel);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(
      fetchCardsHotels(
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined
      )
    );
  }, []);

  const [fav, setFav] = useState([]);
  const [success, setSuccess] = useState(false);
  const [message, setMessage] = useState("");

  const resetState = () => {
    setSuccess(false);
    setMessage("");
  };

  const handleClick = (e) => {
    e.preventDefault();
    if (fav.includes(e.currentTarget.value)) {
      setFav(fav.filter((x) => x !== e.currentTarget.value));
      setMessage("error");
      setSuccess(true);
      setTimeout(resetState, 3000);
    } else {
      setFav(fav.concat(e.currentTarget.value));
      setMessage("success");
      setSuccess(true);
      setTimeout(resetState, 3000);
    }
  };

  return (
    <React.Fragment>
      <CssBaseline />
      <CheckboxList />
      <NavBar />
      <main style={{ marginLeft: "200px" }}>
        {/* Hero unit */}
        <Container className={classes.cardGrid} maxWidth="md">
          {/* End hero unit */}
          <Grid container spacing={4}>
            {cards.posts &&
              cards.posts.map((e) => (
                <Grid item key={e} xs={12} sm={6} md={6}>
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
                    />
                  </Card>
                </Grid>
              ))}
          </Grid>
        </Container>
      </main>
      {/* Footer */}
      <div style={{ marginLeft: "200px", width: "80%" }}>
        <Footer />
        {/* End footer */}
      </div>
      {success ? <FlashMessage message={message} /> : ""}
    </React.Fragment>
  );
}
