import { Bookings } from "../actions/index";
import { ActionTypes } from "../actions/types";

export const reservesReducer = (
  state: Array<Object> = [],
  action: Bookings
) => {
  switch (action.type) {
    case ActionTypes.bookings:
      return action.payload;
    default:
      return state;
  }
};
