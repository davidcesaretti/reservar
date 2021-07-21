import { Bookings } from '../actions';
import { ActionTypes } from "../actions/types";

export const bookingsReducer = (state: Object = {}, action: Bookings) => {
    switch (action.type) {
      case ActionTypes.bookings:
        return action.payload;
      default:
        return state;
    }
  };