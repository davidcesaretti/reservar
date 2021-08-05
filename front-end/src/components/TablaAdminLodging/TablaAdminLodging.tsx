import React, { useState, useEffect } from "react";
import { fetchCardsHotels, getUsersList,getLodgingList } from "../../actions";
import "./TablaLodgin.css";
import { useDispatch, useSelector } from "react-redux";
import { makeStyles, createStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Pagination from "@material-ui/lab/Pagination";
import axios from "axios";
import Swal from "sweetalert2";
import MenuAdmin from "../menuAdmin/MenuAdmin";
import { Button } from "@material-ui/core";
import DeleteIcon from '@material-ui/icons/Delete';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import LoopIcon from '@material-ui/icons/Loop';
import Spinner from "../Spinner/Spinner";



const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      "& > * + *": {
        marginTop: theme.spacing(2),
      },
    },
  })
);

function TablaAdminLodging() {
  const lodging = useSelector((state: any) => state.listOfLodgings);
  const [flag, setFlag] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const [name, setName] = useState({});
 

  const onChange = (e: any) => {
    setName({
      ...name,
      [e.target.name]: e.target.value ? e.target.value : "Active",
    });
    const obj = { [e.target.name]: e.target.value, id: e.target.name };

    if (obj[e.target.name] === "Active") {
      axios.post("http://localhost:3001/admin/suspendedLodging", {
        id: e.target.name,
      });
    } else {
      axios.post("http://localhost:3001/admin/habiliteLodging", {
        id: e.target.name,
      });
    }
    dispatch(getLodgingList());
  };

  const filteredLodging = lodging?.slice(currentPage, currentPage + 8);

  const nextPage = () => {
    if (lodging.length < currentPage + 8) {
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
    setFlag(true)
    dispatch(getLodgingList());
  }, [dispatch, filteredLodging]);

  const handleClickChange = (e) => {
    Swal.fire({
      title: "Do you want to save the changes?",
      showDenyButton: true,
      icon: "question",
      confirmButtonText: `Save`,
      denyButtonText: `Don't save`,
      confirmButtonColor: '#9ea03b',
    denyButtonColor: '#313b1e',
    iconColor:"#9ea03b"
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: "Saved!",
           text:"", 
           icon: "success",
           confirmButtonColor: '#9ea03b',
           iconColor:"#9ea03b"
          });
        onChange(e);
      } else if (result.isDenied) {
        Swal.fire({
          title:"Changes are not saved",
           text:"", 
           icon:"info",
           confirmButtonColor: '#9ea03b',
           iconColor:"#9ea03b"
          });
      }
    });
  };

  const deleteProp = (prop_Id)=> {
    Swal.fire({
      title: "Do you want to delete the property?",
      showDenyButton: true,
      icon: "question",
      confirmButtonText: `Yes`,
      denyButtonText: `No`,
      confirmButtonColor: '#9ea03b',
    denyButtonColor: '#313b1e',
    iconColor:"#9ea03b"
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: "Eliminated!",
           text:"", 
           icon: "error",
           confirmButtonColor: '#9ea03b',
          });
          axios.post("http://localhost:3001/admin/removeProps", {id: prop_Id} )
      } else if (result.isDenied) {
        Swal.fire({
          title:"",
           text:"", 
           icon:"info",
           confirmButtonColor: '#9ea03b',
           iconColor:"#9ea03b"
          });
      }
    });
     
  }

  
  return (
    <div className="con-homeAdmin">
      <MenuAdmin />
      {!flag? <Spinner/>:
        <div>
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
          Registered Lodgings
        </h2>
        <div className="container-tabla">
          <div className="grid-tabla color-grid">
            {" "}
            <p>Name</p>
            <p>Host Name</p>
            <p>City</p>
            <p>Property status</p>
            <p>Change Status</p>
            <p>Delete Property</p>
          </div>

          {filteredLodging &&
            filteredLodging.map((x, i) => (
              <div key={i} className="grid-tabla">
                <p style={{ margin: "14px" }}>{x.name}</p>{" "}
                <p style={{ margin: "14px" }}>{x.host}</p>
                <p style={{ margin: "14px" }}>{x.city}</p>
                <p style={{ margin: "14px" }}>{x.status_account}</p>
                {/* <input style={{ margin: "14px" }} type="checkbox" /> */}
                <button
                  name={x.id}
                  value={x.status_account}
                  onClick={(e) => {
                    handleClickChange(e);
                    
                  }}
                  style={{ margin: "14px" }}
                  className="boton-map"
                >
                  Change
                </button>
                {/* <button
                  name={x.id}
                  style={{ margin: "10px" }}
                  className="boton-map"
                  onClick={() => deleteProp(x.id)}
                >
                  X
                </button> */}
                <Button aria-label="delete" 
                  name={x.id}
                  // style={{ margin: "10px" }}
                  className="boton-map"
                  onClick={() => deleteProp(x.id)}>
                  <DeleteIcon />
                </Button>
                
              </div>
            ))}
        </div>
        <div style={{ margin: "0 auto" }}>
          <Button className="pagButton" onClick={prevPage}>
            <ArrowBackIosIcon/>
          </Button>

          <Button className="pagButton" onClick={nextPage}>
          <ArrowForwardIosIcon/>
          </Button>
        </div>
      </div>
      </div>
      }
    </div>
  );
}

export default TablaAdminLodging;
