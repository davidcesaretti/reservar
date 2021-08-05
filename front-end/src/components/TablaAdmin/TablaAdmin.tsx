import React, { useState, useEffect } from "react";
import { fetchCardsHotels, getUsersList } from "../../actions";
import "./Tabla.css";
import { useDispatch, useSelector } from "react-redux";
import { makeStyles, createStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Pagination from "@material-ui/lab/Pagination";
import axios from "axios";
import Swal from "sweetalert2";
import MenuAdmin from "../menuAdmin/MenuAdmin";
import { Button } from "@material-ui/core";
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import LoopIcon from '@material-ui/icons/Loop';

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
  const [name, setName] = useState({});

  const onChange = (e: any) => {
    setName({
      ...name,
      [e.target.name]: e.target.value ? e.target.value : "Active",
    });
    const obj = { [e.target.name]: e.target.value, email: e.target.name };

    if (obj[e.target.name] === "Active") {
      axios.post("http://localhost:3001/admin/suspended", {
        email: e.target.name,
      });
    } else {
      axios.post("http://localhost:3001/admin/habilite", {
        email: e.target.name,
      });
    }
    dispatch(getUsersList());
  };

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

  useEffect(() => {
    dispatch(getUsersList());
  }, [dispatch,filteredUsers]);

  const handleClickChange = (e) => {
    Swal.fire({
      title: "Do you want to change the status?",
      showDenyButton: true,
      icon: "question",
      confirmButtonText: `Yes`,
      denyButtonText: `No`,
      confirmButtonColor: '#9ea03b',
    denyButtonColor: '#313b1e',
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: "Success",
           text:"", 
           icon: "success",
           confirmButtonColor: '#9ea03b',
          });
        onChange(e);
      } else if (result.isDenied) {
        Swal.fire({
          title:"Changes are not saved",
           text:"", 
           icon:"info",
           confirmButtonColor: '#9ea03b',
          });
      }
    });
  };

  return (
    
     
    <div className="con-homeAdmin">
      <MenuAdmin />
      <div style={{ display: "grid" }}>
        <h2
          style={{
            margin: "0",
            paddingTop: "1rem",
            marginTop: "1rem",
            color: "black",
            textShadow: "1.4px 1.4px 1px #B2B1B9",
            fontSize: "calc(2vw + 1em)",
          }}
          className="title"
        >
          Registered Users
        </h2>
        <div className="container-tabla1">
          <div className="grid-tabla1 color-grid1">
            {" "}
            <p>Name</p>
            <p>Email</p>
            <p>Country</p>
            <p>Account status</p>
            <p>Change Status</p>
          </div>

          {filteredUsers &&
            filteredUsers.map((x, i) => (
              <div key={i} className="grid-tabla1">
                <p style={{ margin: "14px" }}>{x.name}</p>{" "}
                <p style={{ margin: "14px" }}>{x.email}</p>
                <p style={{ margin: "14px" }}>{x.nationality}</p>
                <p style={{ margin: "14px" }}>{x.status_account}</p>
                
                {/* <button
                  name={x.email}
                  value={x.status_account}
                  onClick={(e) => {
                    handleClickChange(e);
                  }}
                  style={{ margin: "14px" }}
                  className="boton-map1"
                >
                  change
                </button> */}

                <Button
                name={x.email}
                value={x.status_account}
                onClick={(e) => {
                  handleClickChange(e);
                }}
                style={{ margin: "14px" }}
                className="boton-map"
                >
                  <LoopIcon/>
                </Button>
              </div>
            ))}
        </div>
        <div style={{ margin: "0 auto" }}>
        <Button className="pagButton1" onClick={prevPage}>
            <ArrowBackIosIcon/>
          </Button>

          <Button className="pagButton1" onClick={nextPage}>
          <ArrowForwardIosIcon/>
          </Button>
        </div>
      </div>
    </div>
   
  );
}

export default TablaAdmin;
