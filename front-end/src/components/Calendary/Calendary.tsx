import React from "react";
import "date-fns";
import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";

export function Calendary() {
  // The first commit of Material-UI
  const [aux, setAux] = React.useState<Boolean>(false);

  var hora = new Date()
  const [arrivalDate, setArrivalDate] = React.useState<Date | String>(new Date(hora).toISOString());
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

  
function disableDates(date:Date) {
  return date.getDate() === 15 || date.getDate() === 16 || date.getDate() === 17 || date.getDate() === 18

}

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <KeyboardDatePicker
          disableToolbar
          variant="inline"
          format="dd/MM/yyyy"
          margin="none"
          style={{marginRight:"10px", marginLeft:"10px"}}
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
          style={{marginRight:"10px", marginLeft:"10px"}}
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
