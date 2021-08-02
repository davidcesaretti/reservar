import React from "react";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import moment from "moment";
import { GoTrashcan } from "react-icons/go";
import axios from "axios";
import "./addProperty.css";
import { reservefake } from "../../actions";
import { useDispatch } from "react-redux";

function rand() {
  return Math.round(Math.random() * 20) - 10;
}

function getModalStyle() {
  const top = 50 + rand();
  const left = 50 + rand();

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    paper: {
      position: "absolute",
      width: "50%",
      height: "80%",
      backgroundColor: theme.palette.background.paper,
      border: "2px solid #000",
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
      overflow: "scroll",
      overflowX: "hidden",
      margin: "0 auto",
      "&::-webkit-scrollbar": {
        width: "8px" /* Tamaño del scroll en vertical */,
        height: "8px" /* Tamaño del scroll en horizontal */,
        display: "none" /* Ocultar scroll */,
      },
    },
    btnProperties: {
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
    },
  })
);

export default function SimpleModal({ data, idProp }) {
  const classes = useStyles();

  const [modalStyle] = React.useState(getModalStyle);
  const [open, setOpen] = React.useState(false);
  const [tachado, setTachado] = React.useState(data);
  const [mostrar, setMostrar] = React.useState(true);
  const dispatch = useDispatch();

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  function borrado(idProperty, idReserve) {
    axios.post("http://localhost:3001/deleteDates", {
      Prop_id: idProperty,
      Prop_date: idReserve,
    });
  }
  function checkbox() {
    if (mostrar === true) {
      setMostrar(false);
    } else {
      setMostrar(true);
    }
  }
  React.useEffect(() => {
    dispatch(reservefake(idProp));
  }, []);

  const body = (
    <div style={modalStyle} className={classes.paper}>
      <h2 id="simple-modal-title" style={{ textAlign: "center" }}>
        Upcoming blocked dates
      </h2>
      {/* <p id="simple-modal-description">
        Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
      </p> */}

      {data &&
        data.map((x, i) => (
          <div
            key={i}
            style={{
              display: "grid",
              gridTemplateColumns: "80% 20%",
              width: "60%",
              margin: "0 auto",
            }}
          >
            <p>{`${moment(x.fechaSalida).format("MMMM DD/YYYY")} - ${moment(
              x.fechaLlegada
            ).format("MMMM DD/YYYY")}`}</p>{" "}
            <button
              onClick={() => {
                borrado(idProp, x._id);
                checkbox();
                dispatch(reservefake(idProp));
              }}
              className="boton__borrado"
            >
              <GoTrashcan style={{ width: "20px", height: "20px" }} />
            </button>
          </div>
        ))}
      {/* <SimpleModal data={data} /> */}
    </div>
  );

  return (
    <div>
      <button
        className={classes.btnProperties}
        type="button"
        onClick={handleOpen}
      >
        See blocked days
      </button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        {body}
      </Modal>
    </div>
  );
}
