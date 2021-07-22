import React, { useRef, useState } from "react";
import axios from "axios";
import "./addProperty.css";
import { HiMinusCircle, HiPlusCircle } from "react-icons/hi";
import firebase from "firebase";
import { Button } from "@material-ui/core";
import photo from "../../Image/chrome_9G11sUzjQC.png";

function AddProperty() {
  interface firebase {
    uploadValue: any;
    picture: any;
  }
  const refTitle = useRef(undefined);
  const refDescription = useRef(undefined);
  const refAddress = useRef(undefined);
  const refCity = useRef(undefined);
  const refCountry = useRef(undefined);
  const refType = useRef(undefined);
  const refPrice = useRef(undefined);
  const [guests, setGuests] = useState(1);
  const [bedrooms, setBedrooms] = useState(1);
  const [beds, setBeds] = useState(1);
  const [bathrooms, setBathrooms] = useState(1);
  const [firebaseStorage, setFirebaseStorage] = useState<firebase>({
    uploadValue: 0,
    picture: null,
  });
  // console.log(ref?.current?.value, "ref imagen");
  // useEffect(() => {
  //   //  console.log(ref?.current?.value, "ref imagen");
  // }, [ref]);

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
    // const formData = new FormData();
    // formData.append("image", state.file);
    // const config = {
    //   headers: {
    //     "content-type": "multipart/form-data",
    //   },
    // };
    if (
      !refTitle.current.value ||
      !refDescription.current.value ||
      !refType.current.value ||
      !refPrice.current.value ||
      !firebaseStorage.picture ||
      !refAddress.current.value ||
      !refCity.current.value ||
      !refCountry.current.value
    ) {
      alert("Please complete all the fields correctly");
    } else {
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
        address: refAddress.current.value + " " + refCountry.current.value,
        city: refCity.current.value,
        score: 0,
      };
      axios
        .post("http://localhost:3001/upload", formData)
        .then()
        .catch((error) => console.log(error));
      alert("The file is successfully uploaded");
      [
        refTitle.current.value,
        refDescription.current.value,
        refType.current.value,
        refPrice.current.value,
        firebaseStorage.picture,
        refAddress.current.value,
        refCity.current.value,
        refCountry.current.value,
      ] = ["", "", "", "", "", "", "", ""];
      setAmenities([]);
      firebaseStorage.uploadValue = 0;
      const check: any = document.querySelectorAll("input[type='checkbox']");
      check.forEach((x) => {
        x.checked = false;
      });
      setGuests(1);
      setBathrooms(1);
      setBeds(1);
      setBedrooms(1);
    }
  };

  const [amenities, setAmenities] = useState([]);
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

  return (
    <div>
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
            <input ref={refCity} type="text" />
          </div>
          <div className="grid__input">
            <label> Country</label>
            <input ref={refCountry} type="text" />
          </div>
          <div className="grid__input">
            <label> Property type</label>
            <input ref={refType} type="text" />
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
              width="400"
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

            <br />
          </div>
          {/* 
          <form onSubmit={(e) => onFormSubmit(e)}>
            <h1>File Upload</h1>
            <input type="file" name="image" onChange={(e) => onChange(e)} />
            <button type="submit">Upload</button>
          </form> */}
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
            <p>Bathtub</p>
            <input name="Bathtub" type="checkbox" onClick={(e) => push(e)} />
          </div>
          <div className="div__amenities">
            <p>Bidet</p>
            <input name="Bidet" type="checkbox" onClick={(e) => push(e)} />
          </div>
          <div className="div__amenities">
            <p>Body soap</p>
            <input name="Body soap" type="checkbox" onClick={(e) => push(e)} />
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
            <p>Clothing storage</p>
            <input
              name="Clothing storage"
              type="checkbox"
              onClick={(e) => push(e)}
            />
          </div>
          <div className="div__amenities">
            <p>Dryer</p>
            <input name="Dryer" type="checkbox" onClick={(e) => push(e)} />
          </div>
          <div className="div__amenities">
            <p>Drying rack</p>
            <input
              name="Drying rack"
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
            <p>Sound system</p>
            <input
              name="Sound system"
              type="checkbox"
              onClick={(e) => push(e)}
            />
          </div>
          <div className="div__amenities">
            <p>TV</p>
            <input name="TV" type="checkbox" onClick={(e) => push(e)} />
          </div>
          <div className="div__amenities">
            <p>WIFI</p>
            <input name="WIFI" type="checkbox" onClick={(e) => push(e)} />
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
            <p>Blender</p>
            <input name="Blender" type="checkbox" onClick={(e) => push(e)} />
          </div>
          <div className="div__amenities">
            <p>Coffe machine</p>
            <input
              name="Coffe machine"
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
            <p>Backyard</p>
            <input name="Backyard" type="checkbox" onClick={(e) => push(e)} />
          </div>
          <div className="div__amenities">
            <p>Balcony</p>
            <input name="Balcony" type="checkbox" onClick={(e) => push(e)} />
          </div>
          <div className="div__amenities">
            <p>BBQ Grill</p>
            <input name="BBQ Grill" type="checkbox" onClick={(e) => push(e)} />
          </div>
          <div className="div__amenities">
            <p>Beach access</p>
            <input
              name="Beach access"
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
            <p>Hammock</p>
            <input name="Hammock" type="checkbox" onClick={(e) => push(e)} />
          </div>
          <div className="div__amenities">
            <p>Parking (free)</p>
            <input
              name="Parking (free)"
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
            <p>Private entrance</p>
            <input
              name="Private entrance"
              type="checkbox"
              onClick={(e) => push(e)}
            />
          </div>
        </div>
      </div>
      <div
        style={{ margin: "10px", display: "flex", justifyContent: "center" }}
      >
        <button className="boton__submit-add" onClick={(e) => onFormSubmit(e)}>
          Create lodging
        </button>
      </div>
    </div>
  );
}

export default AddProperty;
