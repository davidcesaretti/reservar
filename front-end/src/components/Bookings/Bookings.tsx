import React, { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addreview, getBookChat, getBooking } from "../../actions";
import { useAuth } from "../../firebase/index";
import CardComp from "../CardComp/CardComp";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import Container from "@material-ui/core/Container";
import { Grid, Typography } from "@material-ui/core";
import Error404 from "../Error404/Error404";
import Spinner from "../Spinner/Spinner";
import { Link } from "react-router-dom";
import swal from "sweetalert";
import Swal from "sweetalert2";
import CardBook from "./CardBookings";
import "./Bookings.css";

const useStyles = makeStyles((theme) => ({
  container: {
    minHeight: "482px",
  },
  cardGrid: {
    paddingTop: theme.spacing(6),
    paddingBottom: theme.spacing(8),
  },
  card: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
  },
  title: {
    paddingTop: "1rem",
    marginTop: "1rem",
    color: "black",
    textShadow: "1.4px 1.4px 1px #B2B1B9",
    fontSize: "calc(2vw + 1em)",
  },
  noPublications: {
    fontSize: "2em",
    display: "flex",
    justifyContent: "center",
    alignContent: "center",
    margin: "0 auto",
    paddingTop: "50px",
    marginBottom: "209px",
    color: "#787A91",
  },
}));

const Bookings = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const auth = useAuth();
  const cards = useSelector((state: any) => state.bookings);
  let email = auth.user.email;

  const [review, setReview] = useState({
    username: auth.user.displayName,
    foto: auth.user.photoURL,
    review: "",
    idPropertie: "",
  });
  const onInputChange = (e) => {
    setReview({
      ...review,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    setReview({
      ...review,
      idPropertie: e.target.value,
    });
    if (review.review.length === 0) {
      return swal("Write something first");
    } else if (review.review.length > 150) {
      return swal("Up to 150 characters only supported");
    } else {
      Swal.fire({title: "Published review", icon: "success", confirmButtonColor: '#9ea03b'});
    }
    dispatch(addreview(review));
  };

  useEffect(() => {
    dispatch(getBooking(email));
  }, []);

  console.log(cards)
  return (
    <div className={classes.container}>
      <Grid>
        <Typography className={classes.title} variant="h4" align="center">
          Booking properties
        </Typography>
      </Grid>
      <Container className={classes.cardGrid} maxWidth="md">
        {/* End hero unit */}
        <Grid container spacing={4}>
          {cards.length === 0 ? (
            <div className={classes.noPublications}>
              You don't have any Bookings
            </div>
          ) : (
            cards &&
            cards.map((e) => (
              <Grid item key={e} xs={12} sm={6} md={6}>
                <Card className={classes.card}>
                  <CardBook
                    _id={e._id}
                    image={e.image}
                    score={e.score}
                    name={e.name}
                    type={e.type}
                    address={e.address}
                    accommodates={e.accommodates}
                    beds={e.beds}
                    price={e.price}
                    click={console.log("")}
                    boton={false}
                    deleteButton={false}
                    state={e.state}
                  />
                  {e.flag && (
                    <form onSubmit={onSubmit}>
                      <input
                        required
                        autoComplete="off"
                        name="review"
                        onChange={onInputChange}
                        className="forminput"
                        placeholder="Write your review"
                      ></input>{" "}
                      <button
                        className="formbutton"
                        name="idPropertie"
                        onClick={onInputChange}
                        value={e.Prop_id}
                        type="submit"
                      >
                        SEND REVIEW
                      </button>
                    </form>
                  )}
                </Card>
              </Grid>
            ))
          )}
        </Grid>
      </Container>
    </div>
  );
};

export default Bookings;
