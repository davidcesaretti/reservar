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

export default function HostCalendary({ data, salida, llegada }) {
  const dateArray = [];

  const [startDate, setStartDate] = useState(new Date());
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
  llegada(arrivalDate);
  salida(departureDate);
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
  let fechaSiguiente = moment(arrivalDate).add(1, "days");

  return (
    <div className="calendary">
      <DatePicker
        popperClassName="calendario"
        selected={arrivalDate}
        onChange={(date) => setArrivalDate(date)}
        minDate={new Date()}
        // excludeDates={[dateArray[0]]}
        excludeDates={disableFinal}
        placeholderText="1º"
        inline
      />
      <DatePicker
        popperClassName="calendario"
        selected={departureDate}
        onChange={(date) => setdepartureDate(date)}
        minDate={arrivalDate}
        // excludeDates={[dateArray[0]]}
        excludeDates={disableFinal}
        placeholderText="2º"
        inline
      />
      {/* <div>
         <Button
         onClick={eleccion}>
          INHABILITY WEEKS
          <DatePicker1
           timeFormat={false}
           isValidDate={disableWeekends}
            />
         </Button>
       </div> */}
    </div>
  );
}
