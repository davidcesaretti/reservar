import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; // theme css file
import { DateRangePicker } from "react-date-range";
import subDays from "date-fns/subDays";
import addDays from "date-fns/addDays";
import DatePicker from "react-datepicker";
import DatePicker1 from "react-datetime";
import "react-datepicker/dist/react-datepicker-cssmodules.css";
import "react-datepicker/dist/react-datepicker.css";
import "react-datetime/css/react-datetime.css";
import moment from "moment";
import { Button, Grid, Modal, TextField } from "@material-ui/core";
import { assertVariableDeclarator } from "@babel/types";
import { isValidElement } from "react";
import { addBusinessDays } from "date-fns/esm";

const useStyles = makeStyles((theme) => ({
  root: {
    position: "absolute",
    top: "13hv",
    left: "30vw",
    [theme.breakpoints.down("sm")]: {
      top: "16hv",
      left: 0,
    },
  },
}));

export default function HostCalendary({ data, salida, llegada, disableBoton }) {
  const [startDate2, setStartDate2] = useState(new Date());
  const [endDate2, setEndDate2] = useState(null);
  const onChange = (dates) => {
    const [start, end] = dates;
    setStartDate2(start);
    setEndDate2(end);
  };

  const dateArray = [];

  const classes = useStyles();
  const dataFechas = data[0]?.available.map((x) => {
    return [moment(x.fechaSalida), moment(x.fechaLlegada)];
  });

  const [aux, setAux] = React.useState<Boolean>(false);
  var hora = moment();
  const [arrivalDate, setArrivalDate] = React.useState<Date | any>(new Date());
  const [departureDate, setdepartureDate] = React.useState<Date | any>(
    new Date()
  );
  llegada(startDate2);
  salida(endDate2);
  const handleDateChange = (date: Date) => {
    setArrivalDate(moment(date).format("YYYY-MM-DD"));
    setAux(true);
  };
  const handleChange = (date: Date) => {
    setdepartureDate(moment(date).format("YYYY-MM-DD"));
  };

  function getDates(startDate, stopDate) {
    var currentDate = moment(startDate);
    var stopDatee = moment(stopDate);
    while (currentDate <= stopDatee) {
      dateArray.push(moment(currentDate).format("YYYY-MM-DD"));
      currentDate = moment(currentDate).add(1, "days");
    }
    return dateArray;
  }
  dataFechas.map((x) => getDates(x[0], x[1]));

  const disableFinal = dateArray.map((x) => new Date(x));

  const disableCustomDt = (current) => {
    return !dateArray.includes(current.format("YYYY-MM-DD"));
  };
  const disableWeekends = (current) => {
    return current.day() !== 0 && current.day() !== 6;
  };
  // array 1-6 meses
  // array fechas bloquedas
  // array 6 meses todas sin fechas bloquedas
  // array 6 [0]
  //disable past dates

  const yesterday = moment().subtract(1, "day");
  const disablePastDt = (current) => {
    return current.isAfter(yesterday);
  };

  let valor;
  const eleccion = () => {
    valor = disableWeekends;
    return valor;
  };
  let fechaSiguiente = moment(arrivalDate).add(2, "days");
  const fecha = new Date(moment(fechaSiguiente).format("YYYY-MM-DD"));
  let fechaSiguiente2 = moment(arrivalDate).add(1, "days");
  const fechaSiguiente3 = new Date(
    moment(fechaSiguiente2).format("YYYY-MM-DD")
  );
  console.log(fechaSiguiente3, "fecha nueva");
  console.log(
    moment(disableFinal[1]).format("YYYY-MM-DD") ===
      moment(fechaSiguiente3).format("YYYY-MM-DD")
  );
  console.log(disableFinal[1]);
  console.log(arrivalDate, "fecha actual");
  const fechaBotonArray = disableFinal.map((x) =>
    moment(x).format("YYYY-MM-DD")
  );
  const fechaBotonMoment = moment(startDate2).format("YYYY-MM-DD");
  // console.log(invento.includes(invento2));
  disableBoton(fechaBotonArray, fechaBotonMoment);

  // let array1 = getDates(new Date(), new Date("2021/11/08"));
  // console.log(array1, "filtrado");
  // const array2 = disableFinal.map((x) => moment(x).format("YYYY-MM-DD"));
  // console.log(array2);
  // const array3 = array1.filter((x) => array2.filter((y) => x !== y));
  // console.log(array3, "resultado");
  // console.log(dataFechas[dataFechas.length - 1][1]._d);

  return (
    <div className="calendary">
      <DatePicker
        excludeDates={disableFinal}
        minDate={fecha}
        selected={false}
        onChange={onChange}
        startDate={startDate2}
        endDate={endDate2}
        selectsRange
        inline
        onClick={() => disableBoton(fechaBotonArray, fechaBotonMoment)}
        monthsShown={3}
      />
    </div>
  );
}
