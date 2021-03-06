import React from "react";
import {
  GoogleMap,
  withScriptjs,
  withGoogleMap,
  Marker,
} from "react-google-maps";
import { useSelector } from "react-redux";
import axios from "axios";

function Maps(props) {
  const detailhotel = useSelector((state: any) => state.categorieDetail);
  const coord = {
    lat: detailhotel[0].coordinates?.latitude,
    lng: detailhotel[0].coordinates?.longitude,
  };
  // const coord = {lat:-34.72221160000001 ,lng:-58.5609682}

  return (
    <div>
      <GoogleMap defaultZoom={11} defaultCenter={coord} />
      <Marker position={coord} />
    </div>
  );
}
const WrappedMap = withScriptjs(withGoogleMap(Maps));

//Obtiene coordenadas a partir de una direccion

// function geoCode() {
//   var location = "lo que sea, lo que sea, lo que sea,venezuela";
//   axios
//     .get("https://maps.googleapis.com/maps/api/geocode/json", {
//       params: {
//         address: location,
//         key: API_KEY,
//       },
//     })
//     .then((respuesta) => {
//       console.log(respuesta.data.results[0].geometry.location);
//     })
//     .catch((err) => {
//       console.log(err);
//     });
// }
export function MapInit() {
  // geoCode();
  return (
    <div>
      <WrappedMap
        googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp&language=en&key=${process.env.REACT_APP_API_KEY}`}
        containerElement={<div style={{ height: "400px", width: "600px" }} />}
        mapElement={<div style={{ height: "100%", width: "1200px" }} />}
        loadingElement={<div style={{ height: `100%` }} />}
      />
    </div>
  );
}
