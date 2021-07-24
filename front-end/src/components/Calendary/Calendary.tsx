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
