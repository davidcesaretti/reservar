import React, { useEffect } from "react";
import "date-fns";
import DateFnsUtils from "@date-io/date-fns";
import { useDispatch, useSelector } from "react-redux";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import { FechasReserva } from "../../actions";

export function Calendary() {
  // The first commit of Material-UI
  const dispatch = useDispatch();

  const [aux, setAux] = React.useState<Boolean>(false);

  var hora = new Date();
  const [arrivalDate, setArrivalDate] = React.useState<Date | String>(
    new Date(hora).toISOString()
  );
  const [departureDate, setdepartureDate] = React.useState<Date | String>(
    new Date(hora).toISOString()
  );

  const handleDateChange = (date: Date) => {
    setArrivalDate(new Date(date).toISOString());
    setAux(true);
  };
  const handleChange = (date: Date) => {
    setdepartureDate(new Date(date).toISOString());
  };
  var arrayfechas = [
    "2021-07-22T00:58:04.473+00:00",
    "2021-07-25T00:58:04.473+00:00",
  ];
  const fecha = new Date("2021-07-28T00:58:04.473+00:00");
  console.log(fecha);
  function disableDates(date: Date) {
    return date === fecha;

    // date.getMonth() === 7 && date.getDate() === 9
  }

  const fechas = useSelector((state: any) => state.fechas);
  useEffect(() => {
    dispatch(
      FechasReserva({
        ...fechas,
        checkin: arrivalDate,
        checkout: departureDate,
      })
    );
  }, [arrivalDate, departureDate]);
  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <KeyboardDatePicker
        disableToolbar
        variant="inline"
        format="dd/MM/yyyy"
        margin="none"
        style={{ marginRight: "10px", marginLeft: "10px" }}
        id="date-picker-inline"
        label="Check in"
        value={arrivalDate}
        shouldDisableDate={disableDates}
        disablePast={true}
        onChange={handleDateChange}
        KeyboardButtonProps={{
          "aria-label": "change date",
        }}
      />
      <KeyboardDatePicker
        disableToolbar
        variant="inline"
        format="dd/MM/yyyy"
        margin="none"
        style={{ marginRight: "10px", marginLeft: "10px" }}
        id="date-picker-inline"
        label="Check out"
        value={departureDate}
        disablePast={true}
        shouldDisableDate={disableDates}
        onChange={handleChange}
        minDate={arrivalDate}
        disabled={!aux ? true : false}
        KeyboardButtonProps={{
          "aria-label": "change date",
        }}
      />
    </MuiPickersUtilsProvider>
  );
}

export default Calendary;
