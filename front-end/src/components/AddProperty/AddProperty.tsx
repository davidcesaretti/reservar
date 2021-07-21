import React, { useRef, useState } from "react";
import axios from "axios";
import { useEffect } from "react";
import "./addProperty.css";
import { HiMinusCircle, HiPlusCircle } from "react-icons/hi";
import { Button } from "@material-ui/core";
import { any } from "prop-types";

function AddProperty() {
  const ref = useRef(undefined);
  const [guests, setGuests] = useState(1);
  const [bedrooms, setBedrooms] = useState(1);
  const [beds, setBeds] = useState(1);
  const [bathrooms, setBathrooms] = useState(1);

  console.log(ref?.current?.value, "ref imagen");
  useEffect(() => {
    console.log(ref?.current?.value, "ref imagen");
  }, [ref]);

  const [state, setState] = useState({
    file: null,
  });
  const onFormSubmit = function (e) {
    e.preventDefault();
    const formData = new FormData();
    formData.append("image", state.file);
    const config = {
      headers: {
        "content-type": "multipart/form-data",
      },
    };

    axios
      .post("http://localhost:3001/upload", formData, config)
      .then((response) => {
        alert("The file is successfully uploaded");
      })
      .catch((error) => {});
  };
  const [boolean, setBoolean] = useState(true);
  function checkbox() {
    if (boolean === true) {
      setBoolean(false);
    } else {
      setBoolean(true);
    }
  }
  const onChange = function (e) {
    setState({ file: e.target.files[0] });
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
            <input type="text" />
          </div>
          <div className="grid__input">
            <label> Lodging Description</label>
            <textarea />
          </div>
          <div style={{ display: "flex" }}>
            <p>Max number of guests</p>
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
          <div className="grid__input">
            <label> Address</label>
            <input type="text" />
          </div>
          <div className="grid__input">
            <label> City</label>
            <input type="text" />
          </div>
          <div className="grid__input">
            <label> Country</label>
            <input type="text" />
          </div>
          <div className="grid__input">
            <label> Property type</label>
            <input type="text" />
          </div>

          <form onSubmit={(e) => onFormSubmit(e)}>
            <h1>File Upload</h1>
            <input type="file" name="image" onChange={(e) => onChange(e)} />
            <button type="submit">Upload</button>
          </form>
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
    </div>
  );
}

export default AddProperty;
