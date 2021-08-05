import React, { useRef, useState, useEffect } from "react";
import axios from "axios";
import "./addProperty.css";
import { HiMinusCircle, HiPlusCircle } from "react-icons/hi";
import firebase from "firebase";
import { Button } from "@material-ui/core";
import photo from "../../Image/addfoto.jpeg";
import { useAuth } from "../../firebase/index";
import { useParams } from "react-router-dom";
import { clearDetail, detailHotel, reservefake } from "../../actions";
import { useDispatch, useSelector } from "react-redux";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker-cssmodules.css";
import "react-datepicker/dist/react-datepicker.css";
import moment from "moment";
import subDays from "date-fns/subDays";
import HostCalendary from "../HostCalendary/HostCalendary";
import SimpleModal from "./modal";
import Swal from "sweetalert2";
import NavBar from "../Nav/Nav2";
import Autocomplete from "react-google-autocomplete";
import { useHistory } from "react-router-dom";

function AddProperty() {
  interface firebase {
    uploadValue: any;
    picture: any;
  }
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(null);
  const onChange = (dates) => {
    const [start, end] = dates;
    setStartDate(start);
    setEndDate(end);
  };
  const history = useHistory();
  const dateArray = [];
  const dispatch = useDispatch();
  const idParam = useParams();
  const refTitle = useRef(undefined);
  const refDescription = useRef(undefined);
  const refAddress = useRef(undefined);
  const refCity = useRef(undefined);
  const refType = useRef(undefined);
  const refPrice = useRef(undefined);
  const [guests, setGuests] = useState(1);
  const [bedrooms, setBedrooms] = useState(1);
  const [beds, setBeds] = useState(1);
  const [bathrooms, setBathrooms] = useState(1);
  const [disable, setDisable] = useState(false);
  const [edit, setEdit] = useState(true);
  const [amenities, setAmenities] = useState([]);
  const [firebaseStorage, setFirebaseStorage] = useState<firebase>({
    uploadValue: 0,
    picture: null,
  });
  const auth = useAuth().user?.email;
  const detailEdit = useSelector((state: any) => state.categorieDetail[0]);
  const fechasModal = useSelector((state: any) => state.reserveFake);

  const maps = {
    latitude: 0,
    longitude: 0,
  };
  function geoCode() {
    var location =
      refAddress.current?.value +
      "," +
      refCity.current?.value 
    //var location = "barrio, localidad, ciudad,venezuela"refAddress.current.value
    axios
      .get("https://maps.googleapis.com/maps/api/geocode/json", {
        params: {
          address: location,
          key: process.env.REACT_APP_API_KEY,
        },
      })
      .then((respuesta) => {
        // console.log(respuesta.data.results[0].geometry.location);
        maps.latitude = respuesta.data.results[0].geometry.location?.lat;
        maps.longitude = respuesta.data.results[0].geometry.location?.lng;
      })
      .catch((err) => {
        console.log(err);
      });
  }
  geoCode();

  useEffect(() => {
    if (idParam.id) {
      dispatch(detailHotel(idParam.id));
      dispatch(reservefake(idParam.id));
    }

    return () => {
      dispatch(clearDetail());
    };
  }, [dispatch, idParam.id, startDate, endDate]);

  // console.log(ref?.current?.value, "ref imagen");
  // useEffect(() => {
  //   //  console.log(ref?.current?.value, "ref imagen");
  // }, [ref]);
  // console.log(idParam.id); ///sdadasdasdsadas//

  if (idParam.id && detailEdit && edit) {
    setEdit(false);
    //console.log(refTitle.current.value);
    refTitle.current.value = detailEdit?.name;
    refDescription.current.value = detailEdit?.summary;
    refType.current.value = detailEdit?.type;
    refPrice.current.value = detailEdit?.price;
    firebaseStorage.picture = detailEdit?.image;
    refAddress.current.value = detailEdit?.address;
    refCity.current.value = detailEdit?.city;
  }
  const handleUpdate = function (e) {
    const file = e.target.files[0];
    const storageRef = firebase.storage().ref(`/images/${file?.name}`);
    const task = storageRef.put(file);

    task.on(
      "state_changed",
      (snapshot) => {
        let percentage =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setFirebaseStorage({ ...firebaseStorage, uploadValue: percentage });
      },
      (error) => {
        console.log(error.message);
      },
      () => {
        storageRef
          .getDownloadURL()
          .then((data) => {
            setFirebaseStorage({
              uploadValue: 100,
              picture: data,
            });
          })
          .catch((e) => console.log(e));
      }
    );
  };

  const onFormSubmit = function (e) {
    e.preventDefault();

    if (
      !refTitle.current.value ||
      !refDescription.current.value ||
      !refType.current.value ||
      !refPrice.current.value ||
      !firebaseStorage.picture ||
      !refAddress.current.value ||
      !refCity.current.value
    ) {
      Swal.fire({
        title:"Please complete all the fields correctly", 
        confirmButtonColor: '#9ea03b',
        icon: "info"
       });
    } else {
      Swal.fire({
        title: "Do you want to create this property?",
        showDenyButton: true,
        icon: "question",
        confirmButtonText: `Save`,
        denyButtonText: `Don't save`,
        confirmButtonColor: '#9ea03b',
        denyButtonColor: '#313b1e',
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire({
            title: "Created!",
             text:"", 
             icon: "success",
             confirmButtonColor: 'rgba(90, 110, 56, 0.85)',
            });
          const formData = {
            name: refTitle.current.value,
            summary: refDescription.current.value,
            type: refType.current.value,
            accommodates: guests,
            beds: beds,
            bedrooms: bedrooms,
            bathrooms: bathrooms,
            amenities: amenities,
            price: refPrice.current.value,
            image: firebaseStorage.picture,
            address: refAddress.current.value + ", " + refCity.current.value,
            city: refCity.current.value.split(",")[0],
            score: 0,
            host: auth,
            coordinates: maps,
          };
          axios
            .post("http://localhost:3001/upload", formData)
            .then()
            .catch((error) => console.log(error));
            // history.push("/");
          [
            refTitle.current.value,
            refDescription.current.value,
            refType.current.value,
            refPrice.current.value,
            firebaseStorage.picture,
            refAddress.current.value,
            refCity.current.value,
          ] = ["", "", "", "", "", "", "", ""];
          setAmenities([]);
          firebaseStorage.uploadValue = 0;
          const check: any = document.querySelectorAll(
            "input[type='checkbox']"
          );
          check.forEach((x) => {
            x.checked = false;
          });
          setGuests(1);
          setBathrooms(1);
          setBeds(1);
          setBedrooms(1);
         
          // setTimeout(dispatchuser, 2000);
        } else if (result.isDenied) {
          Swal.fire({
            title:"Changes are not saved",
             text:"", 
             icon:"info",
             confirmButtonColor: 'rgba(90, 110, 56, 0.85)',
            });
        }
      });
    }
  };

  const handleEdit = function (e) {
    e.preventDefault();

    if (
      !refTitle.current.value ||
      !refDescription.current.value ||
      !refType.current.value ||
      !refPrice.current.value ||
      !firebaseStorage.picture ||
      !refAddress.current.value ||
      !refCity.current.value
    ) {
      Swal.fire({
      title:"Please complete all the fields correctly", 
      confirmButtonColor: '#9ea03b',
      icon: "info"
      });

    } else {
      Swal.fire({
        title: "Do you want to save to changes?",
        showDenyButton: true,
        icon: "question",
        confirmButtonText: `Save`,
        denyButtonText: `Don't save`,
        confirmButtonColor: '#9ea03b',
        denyButtonColor: '#313b1e',
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire({
            title: "Saved!",
             text:"", 
             icon: "success",
             confirmButtonColor: '#9ea03b',
            });
          const formData = {
            name: refTitle.current.value,
            summary: refDescription.current.value,
            type: refType.current.value,
            accommodates: guests,
            beds: beds,
            bedrooms: bedrooms,
            bathrooms: bathrooms,
            amenities: amenities,
            price: refPrice.current.value,
            image: firebaseStorage.picture,
            address: refAddress.current.value + ", " + refCity.current.value,
            city: refCity.current.value.split(",")[0],
            score: 0,
            coordinates: maps,
            id: idParam.id,
          };
          axios
            .post("http://localhost:3001/upload/edit", formData)
            .then()
            .catch((error) => console.log(error));
          [
            refTitle.current.value,
            refDescription.current.value,
            refType.current.value,
            refPrice.current.value,
            firebaseStorage.picture,
            refAddress.current.value,
            refCity.current.value,
          ] = ["", "", "", "", "", "", "", ""];
          setAmenities([]);
          firebaseStorage.uploadValue = 0;
          const check: any = document.querySelectorAll(
            "input[type='checkbox']"
          );
          check.forEach((x) => {
            x.checked = false;
          });
          setGuests(1);
          setBathrooms(1);
          setBeds(1);
          setBedrooms(1);
          
      
        } else if (result.isDenied) {
          Swal.fire({
            title:"Changes are not saved",
             text:"", 
             icon:"info",
             confirmButtonColor: '#9ea03b',
            });
        }
      });
    }
  };

  const push = function (e) {
    if (e.target.checked) {
      if (!amenities.includes(e.target.name)) {
        setAmenities([...amenities, e.target.name]);
      }
    }
    if (!e.target.checked) {
      const filter = amenities.filter((x) => x !== e.target.name);
      setAmenities(filter);
    }
  };

  const [aux, setAux] = React.useState<Boolean>(false);
  const [arrivalDate, setArrivalDate] = React.useState<Date | any>(new Date());
  const [departureDate, setdepartureDate] = React.useState<Date | any>(
    new Date()
  );

  const dataFechas = detailEdit?.available.map((x) => {
    return [moment(x.fechaSalida), moment(x.fechaLlegada)];
  });

  function getDates(startDate, stopDate) {
    var currentDate = moment(startDate);
    var stopDatee = moment(stopDate);
    while (currentDate <= stopDatee) {
      dateArray.push(moment(currentDate).format("YYYY-MM-DD"));
      currentDate = moment(currentDate).add(1, "days");
    }
    return dateArray;
  }
  dataFechas?.map((x) => getDates(x[0], x[1]));

  const disableFinal = dateArray.map((x) => new Date(x));

  // const startDate="2021-07-28"
  // const stopDate = "2021-07-31"

  // getDates(startDate,stopDate)

  const disableCustomDt = (current) => {
    return !dateArray.includes(current.format("YYYY-MM-DD"));
  };
  const disableWeekends = (current) => {
    return [moment().day() === 0 || moment().day() === 6];
  };
  const isWeekday = (date) => {
    const day = date.getDay();
    return day !== 0 && day !== 6;
  };
  //disable past dates

  const yesterday = moment().subtract(1, "day");
  const disablePastDt = (current) => {
    return current.isAfter(yesterday);
  };

  let fechaSiguiente = moment(arrivalDate).add(1, "days");

  function dispatchDates() {
    Swal.fire({
      position: 'center',
      icon: 'success',
      title: 'Your dates were blocked',
      showConfirmButton: false,
      timer: 1500
    })
    const objDate = {
      fechaSalida: startDate,
      fechaLlegada: endDate,
      email: auth,
      Prop_id: idParam.id,
    };
    axios.post("http://localhost:3001/reservafake", objDate);
    //  window.location.reload();
  }


  return (
    <div>
      {idParam.id && <NavBar />}
      <h1 style={{ textAlign: "center" }}>ADD A NEW LODGING</h1>
      <div className="Add__property">
        <div className="contendor__property">
          <h2>BASICS</h2>
          <div className="grid__input">
            <label> Lodging Title</label>
            <input ref={refTitle} type="text" />
          </div>
          <div className="grid__input">
            <label> Lodging Description</label>
            <textarea ref={refDescription} />
          </div>

          <div className="grid__input">
            <label> Address</label>
            <input ref={refAddress} type="text" required />
          </div>

          <div className="grid__input">
            <label> City</label>
            <Autocomplete
              apiKey={process.env.REACT_APP_API_KEY}
              onPlaceSelected={(place) => {
                return place.formatted_address
              }}
              language="en"
              ref={refCity}
            />
          </div>

          <div className="grid__input">
            <label> Property type</label>
            {/* <input ref={refType} type="text" /> */}
            <select 
              name="select" 
              ref={refType}
            >
              <option value={-1}></option>
              <option value='Apartment'>Apartment</option>  
              <option value='Condominium'>Condominium</option>
              <option value='Guesthouse'>Guesthouse</option>  
              <option value='Hostel'>Hostel</option>
              <option value='House'>House</option>  
              <option value='Loft'>Loft</option>  
            </select>
          </div>
          <div className="grid__input">
            <label>Nightly price</label>
            <input ref={refPrice} type="number" />
          </div>
          <p style={{ textAlign: "center", fontWeight: "bold" }}>
            Rooms and spaces
          </p>
          <div className="div__spaces">
            <p>Max number of guests</p>
            <div style={{ display: "flex" }}>
              <Button
                onClick={() => (guests > 1 ? setGuests(guests - 1) : false)}
              >
                <HiMinusCircle className="icono__boton" />
              </Button>
              <p>{guests}</p>
              <Button onClick={() => setGuests(guests + 1)}>
                <HiPlusCircle className="icono__boton" />
              </Button>
            </div>
          </div>
          <div className="div__spaces">
            <p>Bedrooms</p>
            <div style={{ display: "flex" }}>
              <Button
                onClick={() =>
                  bedrooms > 1 ? setBedrooms(bedrooms - 1) : false
                }
              >
                <HiMinusCircle className="icono__boton" />
              </Button>
              <p>{bedrooms}</p>
              <Button onClick={() => setBedrooms(bedrooms + 1)}>
                <HiPlusCircle className="icono__boton" />
              </Button>
            </div>
          </div>
          <div className="div__spaces">
            <p>Beds</p>
            <div style={{ display: "flex" }}>
              <Button onClick={() => (beds > 1 ? setBeds(beds - 1) : false)}>
                <HiMinusCircle className="icono__boton" />
              </Button>
              <p>{beds}</p>
              <Button onClick={() => setBeds(beds + 1)}>
                <HiPlusCircle className="icono__boton" />
              </Button>
            </div>
          </div>
          <div className="div__spaces">
            <p>Bathrooms</p>
            <div style={{ display: "flex" }}>
              <Button
                onClick={() =>
                  bathrooms > 1 ? setBathrooms(bathrooms - 1) : false
                }
              >
                <HiMinusCircle className="icono__boton" />
              </Button>
              <p>{bathrooms}</p>
              <Button onClick={() => setBathrooms(bathrooms + 1)}>
                <HiPlusCircle className="icono__boton" />
              </Button>
            </div>
          </div>
          <div>
            <img
              style={{ marginTop: "10px" }}
              width="550"
              height="320"
              src={firebaseStorage.picture ? firebaseStorage.picture : photo}
              alt=""
            />
            <br />
            <progress value={firebaseStorage.uploadValue} max="100"></progress>
            {` ${firebaseStorage.uploadValue}%`}
            <br />
            <br />

            <label className="upload">
              Upload photo
              <input
                type="file"
                accept="image/gif, image/jpeg, image/png, image/jpg"
                style={{
                  color: "transparent",
                  display: "none",
                  marginTop: "10px",
                }}
                onChange={(e) => handleUpdate(e)}
              />
            </label>
            <label>Only JPEG, JPG or PNG files allowed</label>
            {/* 
            <br />
            <br /> */}
          </div>
        </div>

        <div className="contenedor__amenities">
          <h2>Amenities</h2>
          <div className="div__amenities">
            <p>Air conditioning</p>
            <input
              name="Air conditioning"
              type="checkbox"
              onClick={(e) => push(e)}
            />
          </div>
          <div className="div__amenities">
            <p>Heating</p>
            <input name="Heating" type="checkbox" onClick={(e) => push(e)} />
          </div>
          <div className="div__amenities">
            <p>Kitchen</p>
            <input name="Kitchen" type="checkbox" onClick={(e) => push(e)} />
          </div>
          <div className="div__amenities">
            <p>First aid kit</p>
            <input
              name="First aid kit"
              type="checkbox"
              onClick={(e) => push(e)}
            />
          </div>
          <div className="div__amenities">
            <p>Smoke detector</p>
            <input
              name="Smoke detector"
              type="checkbox"
              onClick={(e) => push(e)}
            />
          </div>
          <div className="div__amenities">
            <p>Hair dryer</p>
            <input name="Hair dryer" type="checkbox" onClick={(e) => push(e)} />
          </div>
          <div className="div__amenities">
            <p>Hot water</p>
            <input name="Hot water" type="checkbox" onClick={(e) => push(e)} />
          </div>
          <div className="div__amenities">
            <p>Long term stays allowed</p>
            <input
              name="Long term stays allowed"
              type="checkbox"
              onClick={(e) => push(e)}
            />
          </div>
          <div className="div__amenities">
            <p>Dryer</p>
            <input name="Dryer" type="checkbox" onClick={(e) => push(e)} />
          </div>
          <div className="div__amenities">
            <p>Pack ’n Play/travel crib</p>
            <input
              name="Pack ’n Play/travel crib"
              type="checkbox"
              onClick={(e) => push(e)}
            />
          </div>
          <div className="div__amenities">
            <p>Hangers</p>
            <input name="Hangers" type="checkbox" onClick={(e) => push(e)} />
          </div>
          <div className="div__amenities">
            <p>Iron</p>
            <input name="Iron" type="checkbox" onClick={(e) => push(e)} />
          </div>
          <div className="div__amenities">
            <p>Microwave</p>
            <input name="Microwave" type="checkbox" onClick={(e) => push(e)} />
          </div>
          <div className="div__amenities">
            <p>TV</p>
            <input name="TV" type="checkbox" onClick={(e) => push(e)} />
          </div>
          <div className="div__amenities">
            <p>WIFI</p>
            <input name="Wifi" type="checkbox" onClick={(e) => push(e)} />
          </div>
          <div className="div__amenities">
            <p>Fire extinguisher</p>
            <input
              name="Fire extinguisher"
              type="checkbox"
              onClick={(e) => push(e)}
            />
          </div>
          <div className="div__amenities">
            <p>Refrigerator</p>
            <input
              name="Refrigerator"
              type="checkbox"
              onClick={(e) => push(e)}
            />
          </div>
          <div className="div__amenities">
            <p>Stove</p>
            <input name="Stove" type="checkbox" onClick={(e) => push(e)} />
          </div>
          <div className="div__amenities">
            <p>Coffee maker</p>
            <input
              name="Coffee maker"
              type="checkbox"
              onClick={(e) => push(e)}
            />
          </div>
          <div className="div__amenities">
            <p>Cooking basics</p>
            <input
              name="Cooking basics"
              type="checkbox"
              onClick={(e) => push(e)}
            />
          </div>
          <div className="div__amenities">
            <p>Dishes and silverware</p>
            <input
              name="Dishes and silverware"
              type="checkbox"
              onClick={(e) => push(e)}
            />
          </div>
          <div className="div__amenities">
            <p>Dishwasher</p>
            <input name="Dishwasher" type="checkbox" onClick={(e) => push(e)} />
          </div>
          <div className="div__amenities">
            <p>Oven</p>
            <input name="Oven" type="checkbox" onClick={(e) => push(e)} />
          </div>
          <div className="div__amenities">
            <p>Waterfront</p>
            <input name="Waterfront" type="checkbox" onClick={(e) => push(e)} />
          </div>
          <div className="div__amenities">
            <p>Laptop friendly workspace</p>
            <input
              name="Laptop friendly workspace"
              type="checkbox"
              onClick={(e) => push(e)}
            />
          </div>
          <div className="div__amenities">
            <p>Gym</p>
            <input name="Gym" type="checkbox" onClick={(e) => push(e)} />
          </div>
          <div className="div__amenities">
            <p>24-hour check-in</p>
            <input
              name="24-hour check-in"
              type="checkbox"
              onClick={(e) => push(e)}
            />
          </div>
          <div className="div__amenities">
            <p>Cleaning before checkout</p>
            <input
              name="Cleaning before checkout"
              type="checkbox"
              onClick={(e) => push(e)}
            />
          </div>
          <div className="div__amenities">
            <p>Doorman</p>
            <input name="Doorman" type="checkbox" onClick={(e) => push(e)} />
          </div>
          <div className="div__amenities">
            <p>Carbon monoxide detector (free)</p>
            <input
              name="Carbon monoxide detector"
              type="checkbox"
              onClick={(e) => push(e)}
            />
          </div>
          <div className="div__amenities">
            <p>Pets allowed</p>
            <input
              name="Pets allowed"
              type="checkbox"
              onClick={(e) => push(e)}
            />
          </div>
          <div className="div__amenities">
            <p>Pool</p>
            <input name="Pool" type="checkbox" onClick={(e) => push(e)} />
          </div>
          <div className="div__amenities">
            <p>Ethernet connection</p>
            <input
              name="Ethernet connection"
              type="checkbox"
              onClick={(e) => push(e)}
            />
          </div>
        </div>
      </div>
      <div
        style={{
          margin: "10px",
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
        }}
      >
        {idParam.id && (
          <div className="calendary-center">
            <h2>AVAILABILITY</h2>
            <p style={{ width: "60%", margin: "0", textAlign: "match-parent" }}>
              Select the dates you don´t want to keep available for booking.
              Dates you dont´t select will be available for renting but don´t
              worry, you can always changes your selections{" "}
            </p>

            <div className="calendary">
              <DatePicker
                excludeDates={disableFinal}
                minDate={new Date()}
                startDate={startDate}
                endDate={endDate}
                selectsRange
                selected={startDate}
                onChange={onChange}
                inline
                monthsShown={2}
                filterDate={disable ? isWeekday : false}
              />
            </div>
            <div
              style={{
                display: "flex",
                gap: "5px",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {/* <button onClick={() => setDisable(!disable)}>
                Block weekends
              </button> */}
              {!endDate && (
                <button
                  style={{
                    border: "0.5px solid #000000",
                    boxSizing: "border-box",
                    boxShadow: "0px 2px 2px rgba(0, 0, 0, 0.25)",
                    borderRadius: "5px",
                  }}
                  disabled={true}
                  onClick={() => {
                    dispatchDates();
                  }}
                >
                  Block selected dates{" "}
                </button>
              )}
              {endDate && (
                <button
                  style={{
                    margin: "5px auto",
                    width: "140px",
                    height: "20px",
                    color: "white",
                    backgroundColor: "#b2b451",
                    border: "0.5px solid #000000",
                    boxSizing: "border-box",
                    boxShadow: "0px 2px 2px rgba(0, 0, 0, 0.25)",
                    borderRadius: "5px",
                    cursor: "pointer",
                  }}
                  onClick={() => {
                    dispatchDates();
                  }}
                >
                  Block selected dates{" "}
                </button>
              )}

              <SimpleModal data={fechasModal} idProp={idParam.id} />
            </div>
          </div>
        )}
        {!idParam.id && (
          <button
            className="boton__submit-add"
            onClick={(e) => onFormSubmit(e)}
          >
            Create lodging
          </button>
        )}
        {idParam.id && (
          <button className="boton__submit-add" onClick={(e) => handleEdit(e)}>
            Edit lodging
          </button>
        )}
      </div>
    </div>
  );
}

export default AddProperty;
