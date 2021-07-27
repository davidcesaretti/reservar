import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router";
import { clearDetail, detailHotel, fetchCardsHotels } from "../../actions";
import { Link } from "react-router-dom";
import NavBar from "../Nav/Nav2";
import style from "./DetailHotel.module.css";
import { Button, Grid, Modal, TextField } from "@material-ui/core";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import Rating from "@material-ui/lab/Rating";
import Box from "@material-ui/core/Box";
import Recom1 from "../../Image/recom1.jpeg";
import Recom2 from "../../Image/recom2.jpeg";
import Recom3 from "../../Image/recom3.jpeg";
import Recom4 from "../../Image/recom4.jpeg";
import Service from "../Service/Services";
import DateFnsUtils from "@date-io/date-fns";
import user from "../../Image/user.svg";
import "./detailHotel.css";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import Footer from "../Footer/Footer";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import Spinner from "../Spinner/Spinner";
import Error404 from "../Error404/Error404";
import { FechasReserva, FirstStepReserve } from "../../actions";
import { useAuth } from "../../firebase/index";
import CardComp from "../CardComp/CardComp";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import HotelIcon from "@material-ui/icons/Hotel";
import ApartmentIcon from "@material-ui/icons/Apartment";
import AddLocationIcon from "@material-ui/icons/AddLocation";
import moment from "moment";
import { Typography } from "@material-ui/core";
import baño from "../../Image/baño.svg";
import cuarto from "../../Image/rooms.svg";

import HostCalendary from "../HostCalendary/HostCalendary";
import { MapInit } from "../Maps/Maps";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: 200,
      display: "flex",
      alignItems: "center",
    },
    containerRecomendados: {
      padding: "0.5rem 3rem",
      margin: "1.3rem 0",
    },
    imgRecomendadas: {
      borderRadius: "1em",
      height: "12rem",
      width: "15rem",
      backgroundPosition: "center",
    },
    modal: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },
    paper: {
      overflow: "scroll",
      backgroundColor: theme.palette.background.paper,
      border: "2px solid #000",
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
      height: "70%",
    },
    buton: {
      margin: "1rem",
      fontSize: "12px",
    },
    calen: {
      boxShadow: theme.shadows[5],
      marginRight: "10px",
      marginLeft: "10px",
    },
    star: {
      position: "absolute",
      marginTop: "-8rem",
      padding: "10%",
    },
    explore: {
      paddingBottom: "1.25rem",
      color: "black",
      textShadow: "1.4px 1.4px 1px #B2B1B9",
      [theme.breakpoints.down("xs")]: {
        marginBottom: "5px",
      },
    },
  })
);

function truncate(str, n) {
  return str?.length > n ? str.substring(0, n - 1) + "..." : str; //funcion para recortar parrafos y dejar los ...
}

const DetailHotel = () => {
  const detailhotel = useSelector((state: any) => state.categorieDetail);
  const cards = useSelector((state: any) => state.cardsHotel);
  const fechas = useSelector((state: any) => state.fechas);
  const dispatch = useDispatch();
  const auth = useAuth();

  const [value, setValue] = useState(0);
  const [hover, setHover] = useState(-1);
  const [aux, setAux] = React.useState<Boolean>(false);

  var hora = new Date();
  const [arrivalDate, setArrivalDate] = React.useState<Date | any>(
    new Date(hora).toISOString()
  );
  const [departureDate, setdepartureDate] = React.useState<Date | any>(
    new Date(hora).toISOString()
  );

  const handleDateChange = (date: Date) => {
    setArrivalDate(new Date(date).toISOString());
    setAux(true);
  };
  const handleChange = (date: Date) => {
    setdepartureDate(new Date(date).toISOString());
  };

  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const classes = useStyles();
  const { id } = useParams();
  useEffect(() => {
    dispatch(detailHotel(id));
  }, []);

  let page = Math.floor(Math.random() * 12);
  useEffect(() => {
    dispatch(
      FechasReserva({
        ...fechas,
        checkin: arrivalDate,
        checkout: departureDate,
      })
    );
  }, [arrivalDate, departureDate]);
  const fechaLlegada = arrivalDate;
  var fechaL = moment(fechaLlegada).format("DD/MM/YY");
  const fechaSalida = departureDate;
  var fechaS = moment(fechaSalida).format("DD/MM/YY");

  var cantidad = moment(fechaSalida).diff(moment(fechaLlegada), "days"); //realizar operacion resta de fechas
  cantidad = cantidad + 1;
  var total = cantidad * detailhotel[0]?.price;
  var result = cantidad === 0 ? detailhotel[0]?.price : total;
  console.log(cantidad);
  console.log(total);

  let properties = [];
  function exploreProperties() {
    if (cards?.posts) {
      let result = cards.posts.slice(0, 4);

      properties.push(result);
    }
  }
  exploreProperties();
  console.log(properties);
  const obj = {
    Prop_id: id,
    fechaSalida: arrivalDate,
    fechaLlegada: departureDate,
    email: auth.user?.email,
    preciofinal: result,
    host: detailhotel,
  };
  console.log(obj);
  const handleSubmit = () => {
    dispatch(FirstStepReserve(obj));
  };
  if (detailhotel === null) {
    return <Error404 />;
  } else if (detailhotel.length < 1) {
    return <Spinner />;
  } else {
    return (
      <div>
        <div className={style.gridconteiner}>
          <div>
            <NavBar />
            <div className={style.contimg}>
              <img
                src={detailhotel[0]?.image}
                style={{ width: 650, height: 350 }}
                alt="No data"
              />
            </div>
            <div className={style.contnd}>
              <div className={style.name}>{detailhotel[0]?.name}</div>
              <h3 className={style.des}>Description</h3>
              <div className={style.summ}>{detailhotel[0]?.summary}</div>
              <hr className={style.hr} />
            </div>
            <div
              style={{
                borderTop: "1px solid black",
                width: "90%",
                margin: "5px auto",
                marginBottom: "10px",
              }}
            ></div>
            <div className={"div__detail1-amenities"}>
              <div className={style.gridPadre}>
                <div className={style.gridHijo1}>
                  <div className={"div__detail1-p"}>
                    <p>Arrival date</p>
                    <p>{fechaL}</p>
                  </div>
                </div>
                <div className={style.gridHijo2}>
                  <div className={"div__detail1-p"}>
                    <p>Departure date</p>
                    <p>{fechaS}</p>
                  </div>
                </div>
                <div className={style.gridHijo3}>
                  <div>
                    <div className={style.gridHijo4}>
                      <div className="gridHijo4-parte1">
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "flex-start",
                          }}
                        >
                          <ApartmentIcon></ApartmentIcon>
                          <p
                            style={{
                              margin: "0",
                              marginRight: "20px",
                              marginTop: "2px",
                            }}
                          >
                            {detailhotel[0]?.type}
                          </p>
                        </div>
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "flex-start",
                          }}
                        >
                          <AddLocationIcon></AddLocationIcon>
                          <p className="marginCero">
                            {detailhotel[0]?.address}
                          </p>
                        </div>
                      </div>
                      <div className="gridHijo4-parte2">
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "flex-start",
                          }}
                        >
                          <AccountCircleIcon></AccountCircleIcon>
                          <p className="marginCero">
                            {detailhotel[0]?.accommodates}
                          </p>
                        </div>
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "flex-start",
                          }}
                        >
                          <img src={baño} alt="" width="24px" height="24px" />
                          <p className="marginCero">
                            {" "}
                            {detailhotel[0]?.bathrooms}
                          </p>
                        </div>
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "flex-start",
                          }}
                        >
                          <img src={cuarto} alt="" width="24px" height="24px" />
                          <p className="marginCero">
                            {" "}
                            {detailhotel[0]?.bedrooms}
                          </p>
                        </div>
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "flex-start",
                          }}
                        >
                          <HotelIcon></HotelIcon>
                          <p className="marginCero"> {detailhotel[0]?.beds}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className={"div__detail2"}>
            <img
              src={detailhotel[0]?.image}
              className="imagen_div-detail2"
              alt="No imagagen"
            />
          </div>
          <div className={"div__detail3"}>
            <div className={"div__detail3-resumen"}>
              <div className={"div-detail3-resumen-contenedor"}>
                <div className={"div-resumen1"}>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "space-around",
                    }}
                  >
                    <div className="card__container-detail">
                      {" "}
                      <p className="marginCero">Value per nigth</p>{" "}
                      <p className="marginCero"> $ {detailhotel[0].price}</p>
                    </div>
                    <div className="card__container-detail">
                      <p className="marginCero">Number of nights</p>{" "}
                      <p className="marginCero">{cantidad}</p>
                    </div>
                  </div>
                  <div
                    style={{
                      borderTop: "1px solid black",
                      width: "90%",
                      margin: "5px auto",
                      marginBottom: "10px",
                    }}
                  ></div>
                </div>
                <div className={"div-resumen2"}>
                  <div className="card__container-detail">
                    <p
                      style={{
                        fontSize: "18px",
                        fontWeight: "bold",
                        margin: "10px",
                      }}
                    >
                      Total price
                    </p>
                    <p
                      style={{
                        fontSize: "26px",
                        color: "blue",
                        margin: "10px",
                      }}
                    >
                      {`$ ${total}`}
                    </p>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      padding: "5px",
                    }}
                  >
                    <Link to="/payments">
                      <button
                        onClick={() => handleSubmit()}
                        className="boton__submit-add marginCero"
                      >
                        Reserve
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
            <div className={"div__detail3-score"}>
              <div>
                <p style={{ color: "white", fontWeight: "bold" }}>Score</p>
              </div>
              <div>
                <p className="number-score">{`${detailhotel[0].score}/10`}</p>
              </div>
              <div>
                <p
                  style={{ color: "white", fontWeight: "bold", marginTop: "0" }}
                >{`${detailhotel[0].reviews.length} reviews`}</p>
              </div>
            </div>

            <div className={"div__detail3-servicios"}>
              <div className={style.flex}>
                <div className={style.flexhijo}>
                  <h2 className={style.service}>OUTSTANDING SERVICES</h2>
                  <Button
                    className={classes.buton}
                    onClick={() => handleOpen()}
                  >
                    See all
                  </Button>
                </div>
                <div className={style.slice}>
                  <Service amenities={detailhotel[0]?.amenities.slice(0, 2)} />
                  <div className="division"></div>
                  <Service amenities={detailhotel[0]?.amenities.slice(2, 4)} />
                </div>

                <div>
                  <Modal
                    className={classes.modal}
                    open={open}
                    onClose={handleClose}
                    closeAfterTransition
                    BackdropComponent={Backdrop}
                    BackdropProps={{
                      timeout: 500,
                    }}
                  >
                    <Fade in={open}>
                      <div className={classes.paper}>
                        <Service amenities={detailhotel[0].amenities} />
                      </div>
                    </Fade>
                  </Modal>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div style={{ height: "400px", marginTop: "100px" }}>
          {detailhotel.coordinates ? <MapInit /> : ""}
        </div>
        <div className="container-calendary">
          <p
            className="marginCero"
            style={{
              fontWeight: "bold",
              fontSize: "24px",
              paddingBottom: "5px",
            }}
          >
            Availability
          </p>
          <p className="marginCero" style={{ fontWeight: "bold" }}>
            Having different dates in mind? Check availability
          </p>
          <div>
            {" "}
            <HostCalendary
              data={detailhotel}
              salida={setdepartureDate}
              llegada={setArrivalDate}
            />
          </div>
        </div>
        <div className="container-reviews">
          <h2 style={{ textAlign: "center", fontWeight: "bold" }}>
            REVIEWS FROM OUR GUESTS
          </h2>
          {detailhotel[0].reviews.length > 0 &&
            detailhotel[0].reviews.map((x) => (
              <div style={{ marginBottom: "20px" }}>
                <div className="div-user-reviews">
                  <img width="40px" height="40px" src={user} alt="user" />
                  <p style={{ fontWeight: "bold", fontSize: "18px" }}>
                    Guest: {`${x.reviewer_name}`}
                  </p>
                </div>
                <p
                  style={{
                    textAlign: "justify",
                    width: "90%",
                    margin: "0 auto",
                  }}
                >
                  {x.comments}
                </p>
              </div>
            ))}
        </div>
        {/* <div>
          <Grid
            xs={12}
            alignItems="center"
            justifyContent="space-evenly"
            direction="row"
            container
            className={classes.containerRecomendados}
          >
            <Grid item xs={2}>
              <img
                src={`${Recom1}`}
                alt=""
                className={classes.imgRecomendadas}
              />
            </Grid>
            <Grid item xs={2}>
              <img
                src={`${Recom2}`}
                alt=""
                className={classes.imgRecomendadas}
              />
            </Grid>
            <Grid item xs={2}>
              <img
                src={`${Recom3}`}
                alt=""
                className={classes.imgRecomendadas}
              />
            </Grid>
            <Grid item xs={2}>
              <img
                src={`${Recom4}`}
                alt=""
                className={classes.imgRecomendadas}
              />
            </Grid>
          </Grid>
        </div> */}
        <Grid
          md={12}
          alignItems="center"
          justifyContent="space-between"
          direction="row"
          container
          className={classes.containerRecomendados}
        >
          <Grid
            item
            xs={12}
            md={12}
            style={{ textAlign: "center" }}
            className={classes.explore}
          >
            <Typography variant="h6">
              OTHER ACCOMMODATIONS THAT MIGHT INTEREST YOU
            </Typography>
          </Grid>
          {properties[0] &&
            properties[0].map((el, i) => (
              <Grid item xs={6} md={2} key={i}>
                <Link to={`/categories/${el._id}`}>
                  <img
                    src={`${el.image}`}
                    alt={`${el.name}`}
                    className={classes.imgRecomendadas}
                  />
                </Link>
              </Grid>
            ))}
        </Grid>
        <Footer />
      </div>
    );
  }
};

export default DetailHotel;
