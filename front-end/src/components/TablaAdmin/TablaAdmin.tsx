import React, { useState, useEffect } from "react";
import { fetchCardsHotels, getUsersList } from "../../actions";
import "./Tabla.css";
import { useDispatch, useSelector } from "react-redux";
import { makeStyles, createStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Pagination from "@material-ui/lab/Pagination";
import axios from "axios";

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      "& > * + *": {
        marginTop: theme.spacing(2),
      },
    },
  })
);

function TablaAdmin() {
  const user = useSelector((state: any) => state.listOfUsers);
  const [data, setData] = useState(undefined);
  const [currentPage, setCurrentPage] = useState(0);
  const filteredUsers = user?.slice(currentPage, currentPage + 8);

  const nextPage = () => {
    if (user.length < currentPage + 8) {
      setCurrentPage(currentPage);
    } else {
      setCurrentPage(currentPage + 8);
    }
  };

  const prevPage = () => {
    if (currentPage < 7) {
      setCurrentPage(0);
    } else {
      setCurrentPage(currentPage - 8);
    }
  };

  const classes = useStyles();
  const [page, setPage] = React.useState(1);
  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };
  const dispatch = useDispatch();

  console.log(data);
  console.log(user);

  useEffect(() => {
    dispatch(getUsersList());
  }, [dispatch]);

  //   axios.get("http://localhost:3001/admin/getusers").then((respuesta) => {
  //     setData(respuesta.data);
  //     console.log(data);
  //   });

  return (
    <div style={{ display: "grid" }}>
      <div className="container-tabla">
        <div className="grid-tabla color-grid">
          {" "}
          <p>Name</p>
          <p>Host Name</p>
          <p>City</p>
          <p># reservation</p>
          <p>Account status</p>
        </div>

        {filteredUsers &&
          filteredUsers.map((x, i) => (
            <div key={i} className="grid-tabla">
              <p style={{ margin: "14px" }}>{x.name}</p>{" "}
              <p style={{ margin: "14px" }}>valencia</p>
              <p style={{ margin: "14px" }}>
                {x.city_and_country_of_residence}
              </p>
              <input style={{ margin: "14px" }} type="checkbox" />
              <button style={{ margin: "14px" }} className="boton-map">
                hola
              </button>
            </div>
          ))}
      </div>
      <div style={{ margin: "0 auto" }}>
        <button onClick={prevPage}>prev</button>
        <button onClick={nextPage}>next</button>
      </div>
    </div>
  );
}

export default TablaAdmin;
