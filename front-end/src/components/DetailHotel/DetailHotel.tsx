import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router";
import { clearDetail, detailHotel } from "../../actions";
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
import { MuiPickersUtilsProvider, KeyboardDatePicker } from "@material-ui/pickers";
import Footer from "../Footer/Footer";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import Spinner from '../Spinner/Spinner'
import Error404 from '../Error404/Error404';
import { FechasReserva, FirstStepReserve } from "../../actions";
import { useAuth } from "../../firebase/index";
import CardComp from "../CardComp/CardComp";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import HotelIcon from "@material-ui/icons/Hotel";
import ApartmentIcon from "@material-ui/icons/Apartment";
import AddLocationIcon from "@material-ui/icons/AddLocation";


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
  })
);

const DetailHotel = () => {
  const detailhotel = useSelector((state: any) => state.categorieDetail);
  const dispatch = useDispatch();
  const auth = useAuth()


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
    setArrivalDate(new Date(date).toISOString())
    setAux(true);
  };
  const handleChange = (date: Date) => {
    setdepartureDate(new Date(date).toISOString());
  };

  function disableDates(date: Date) {
    return (
      date.getDate() === 15 ||
      date.getDate() === 16 ||
      date.getDate() === 17 ||
      date.getDate() === 18
    );
  }

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



  useEffect(() => {
    dispatch(FechasReserva({ checkin: arrivalDate, checkout: departureDate }));
  }, [arrivalDate, departureDate]);


  const obj = {
    Prop_id: id,
    fechaSalida: arrivalDate, 
    fechaLlegada: departureDate,
    email: auth.user?.email,
  }
  const handleSubmit = () => {
    dispatch(FirstStepReserve(obj))
  }
  console.log(obj)

  if(detailhotel === null) {
    return <Error404 />
} else if(detailhotel.length < 1) {
    return <Spinner />
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
                alt="No image"
              />
            </div>
            <div className={style.contnd}>
              <div className={style.name}>{detailhotel[0]?.name}</div>
              <h3 className={style.des}>Description</h3>
              <div className={style.summ}>{detailhotel[0]?.summary}</div>
              <hr className={style.hr} />
            </div>
            <div className={style.gridPadre}>
              <div className={style.gridHijo1}>
                <p>Arrival date</p>
                <p>{arrivalDate.slice(0,10)}</p>
              </div>
              <div className={style.gridHijo2}>
                <p>Departure date</p>
                <p>{departureDate.slice(0,10)}</p>
              </div>
              <div className={style.gridHijo3}>
                <div>
                  <div className={style.gridHijo4}>
                  <ApartmentIcon></ApartmentIcon>
                  {detailhotel[0].type}
                  </div>
                  <div>
                  <AddLocationIcon></AddLocationIcon>
                  {detailhotel[0].address}
                  </div>
                  <div>
                  <AccountCircleIcon></AccountCircleIcon>  
                  {detailhotel[0].accommodates}
                  </div>
                  <div>
                  <HotelIcon></HotelIcon>  
                  {detailhotel[0].beds}
                  </div> 
                  </div>
                </div>
            </div>
            <div className={style.gridEst}>
              <div className={style.score}>
                <p>Value per night {detailhotel[0]?.price}</p>
                <p>Number of nights</p>
              </div>
              <div className={style.totalp}>
                <p>TOTAL STAY</p>
                <Link to={"/payments"}>
                <Button
                  className={style.button}
                  variant="contained"
                  color="primary"
                  onClick={() => handleSubmit()}
                  >
                  Reserve 
                </Button>
                    </Link>
              </div>
            </div>
            <div className={style.contcuad}>
              <div className={style.cuad}>
                <Rating
                  name="hover-feedback"
                  value={value}
                  className={classes.star}
                  precision={0.5}
                  onChange={(event, newValue) => {
                    setValue(newValue);
                  }}
                  onChangeActive={(event, newHover) => {
                    setHover(newHover);
                  }}
                />
              </div>
            </div>
            {/* <div className={style.score}>Score {detailhotel[0]?.score}</div> */}
            <div className={style.flex}>
              <div className={style.flexhijo}>
                <h2 className={style.service}>OUTSTANDING SERVICES</h2>
                <Button className={classes.buton} onClick={() => handleOpen()}>
                  See all
                </Button>
              </div>
              <div className={style.slice}>
                <Service amenities={detailhotel[0]?.amenities.slice(0, 2)} />
                <div style={{ paddingTop: "3px" }}>
                  <Service amenities={detailhotel[0]?.amenities.slice(2, 4)} />
                </div>
              </div>
              <div className={style.hr1}></div>
              <div className={style.hr3}></div>
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
          {/* <div>Accommodates {detailhotel[0]?.accommodates}</div> */}
        </div>
        <div className={style.flexcal}>
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <KeyboardDatePicker
              disableToolbar
              variant="static"
              format="dd/MM/yyyy"
              margin="none"
              className={classes.calen}
              id="date-picker-inline"
              label="Check in"
              value={arrivalDate}
              shouldDisableDate={disableDates}
              disablePast={true}
              onChange={handleDateChange}
              KeyboardButtonProps={{
                "aria-label": "change date",
              }}
            />
            <KeyboardDatePicker
              disableToolbar
              variant="static"
              format="dd/MM/yyyy"
              margin="none"
              className={classes.calen}
              id="date-picker-inline"
              label="Check out"
              value={departureDate}
              disablePast={true}
              shouldDisableDate={disableDates}
              onChange={handleChange}
              minDate={arrivalDate}
              disabled={!aux ? true : false}
              KeyboardButtonProps={{
                "aria-label": "change date",
              }}
            />
          </MuiPickersUtilsProvider>
        </div>
        <div>
          <hr className={style.hr2} />
          <h2 style={{ textAlign: "center", fontFamily: "Roboto" }}>
            OTHER ACCOMMODATIONS THAT MIGHT INTEREST YOU
          </h2>
          <div>
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
          </div>
        </div>
        <div>
          <hr className={style.hr2} />
          <Footer />
        </div>
      </div>
    );
  }
};

export default DetailHotel;
